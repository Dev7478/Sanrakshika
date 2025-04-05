from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from flask_pymongo import PyMongo
from datetime import datetime, timedelta
import os
# from dotenv import load_dotenv
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from twilio.rest import Client
import jwt
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
import firebase_admin
from firebase_admin import credentials, auth
from bson.objectid import ObjectId

# Load environment variables
load_dotenv()

# Initialize Firebase Admin
cred = credentials.Certificate('firebase-service-account.json')
firebase_admin.initialize_app(cred)

app = Flask(__name__)

# Configure CORS
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:5173", "http://localhost:3000", "https://your-production-domain.com"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

socketio = SocketIO(app, cors_allowed_origins=["http://localhost:5173", "http://localhost:3000", "https://your-production-domain.com"])

# MongoDB configuration
app.config["MONGO_URI"] = os.getenv("MONGODB_URI", "mongodb://localhost:27017/sanrakshika")
mongo = PyMongo(app)
db = mongo.db

# JWT configuration
JWT_SECRET = os.getenv("JWT_SECRET", "your-secret-key")
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION = 24 * 60 * 60  # 24 hours

# Email configuration
SMTP_SERVER = os.getenv("SMTP_SERVER")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USERNAME = os.getenv("SMTP_USERNAME")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")

# Twilio configuration
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")
twilio_client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

# Alert thresholds
ALERT_THRESHOLDS = {
    'temperature': {'min': -196, 'max': -150},  # °C
    'pressure': {'min': 1, 'max': 2},  # bar
    'humidity': {'min': 0, 'max': 5},  # %
}

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if "Authorization" in request.headers:
            token = request.headers["Authorization"].split(" ")[1]
        if not token:
            return jsonify({"message": "Token is missing"}), 401
        try:
            # Verify Firebase token
            decoded_token = auth.verify_id_token(token)
            current_user = db.users.find_one({"firebase_uid": decoded_token['uid']})
            if not current_user:
                return jsonify({"message": "User not found"}), 401
        except Exception as e:
            return jsonify({"message": "Invalid token"}), 401
        return f(current_user, *args, **kwargs)
    return decorated

def send_email_alert(to_email, subject, message):
    try:
        msg = MIMEMultipart()
        msg["From"] = SMTP_USERNAME
        msg["To"] = to_email
        msg["Subject"] = subject
        msg.attach(MIMEText(message, "plain"))

        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SMTP_USERNAME, SMTP_PASSWORD)
        server.send_message(msg)
        server.quit()
    except Exception as e:
        print(f"Failed to send email: {str(e)}")

def send_sms_alert(to_phone, message):
    try:
        twilio_client.messages.create(
            body=message,
            from_=TWILIO_PHONE_NUMBER,
            to=to_phone
        )
    except Exception as e:
        print(f"Failed to send SMS: {str(e)}")

def check_alerts(data):
    alerts = []
    
    for parameter, value in data.items():
        if parameter in ALERT_THRESHOLDS:
            thresholds = ALERT_THRESHOLDS[parameter]
            if value < thresholds['min'] or value > thresholds['max']:
                alerts.append(f"{parameter.capitalize()} out of range: {value}")
    
    return alerts

@app.route('/')
def index():
    return render_template('index.html')

# Authentication Routes
@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')
    firebase_token = data.get('firebase_token')

    if not all([email, password, name, firebase_token]):
        return jsonify({'message': 'All fields are required'}), 400

    try:
        # Verify Firebase token
        decoded_token = auth.verify_id_token(firebase_token)
        firebase_uid = decoded_token['uid']

        if db.users.find_one({'email': email}):
            return jsonify({'message': 'Email already registered'}), 400

        user = {
            'email': email,
            'name': name,
            'firebase_uid': firebase_uid,
            'created_at': datetime.utcnow(),
            'role': 'user'
        }

        db.users.insert_one(user)
        user['_id'] = str(user['_id'])
        del user['password']

        return jsonify({
            'user': user
        }), 201
    except Exception as e:
        return jsonify({'message': str(e)}), 400

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    firebase_token = data.get('firebase_token')

    if not firebase_token:
        return jsonify({'message': 'Firebase token is required'}), 400

    try:
        # Verify Firebase token
        decoded_token = auth.verify_id_token(firebase_token)
        firebase_uid = decoded_token['uid']

        user = db.users.find_one({'firebase_uid': firebase_uid})
        if not user:
            return jsonify({'message': 'User not found'}), 401

        user['_id'] = str(user['_id'])
        if 'password' in user:
            del user['password']

        return jsonify({
            'user': user
        })
    except Exception as e:
        return jsonify({'message': str(e)}), 401

@app.route('/api/auth/me', methods=['GET'])
@token_required
def get_current_user(current_user):
    current_user['_id'] = str(current_user['_id'])
    if 'password' in current_user:
        del current_user['password']
    return jsonify(current_user)

# Protected Routes
@app.route('/api/cryo-data', methods=['GET'])
@token_required
def get_cryo_data(current_user):
    location = request.args.get('location')
    query = {'location': location} if location else {}
    
    try:
        data = list(db.cryo_data.find(query).sort('timestamp', -1).limit(100))
        for item in data:
            item['_id'] = str(item['_id'])
            item['timestamp'] = item['timestamp'].isoformat()
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/cryo-data', methods=['POST'])
@token_required
def add_cryo_data(current_user):
    data = request.json
    data['timestamp'] = datetime.utcnow()
    data['user_id'] = current_user['_id']
    
    try:
        alerts = check_alerts(data)
        if alerts:
            alert_message = f"Alert for {data['location']}: {'; '.join(alerts)}"
            
            send_email_alert(
                os.getenv('ALERT_EMAIL'),
                f"Cryo Alert - {data['location']}",
                alert_message
            )
            
            send_sms_alert(
                os.getenv('ALERT_PHONE'),
                alert_message
            )
            
            socketio.emit('new_alert', {
                'location': data['location'],
                'alerts': alerts,
                'timestamp': data['timestamp'].isoformat()
            })
        
        result = db.cryo_data.insert_one(data)
        data['_id'] = str(result.inserted_id)
        data['timestamp'] = data['timestamp'].isoformat()
        
        return jsonify(data), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/locations', methods=['GET'])
@token_required
def get_locations(current_user):
    try:
        locations = db.cryo_data.distinct('location')
        return jsonify(locations)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Emergency Response Routes
@app.route('/api/emergency/detect', methods=['POST'])
@token_required
def detect_emergency(current_user):
    data = request.json
    location = data.get('location')
    species = data.get('species')
    threat_level = data.get('threatLevel')
    urgency = data.get('urgency')

    if not all([location, species, threat_level, urgency]):
        return jsonify({'message': 'Missing required fields'}), 400

    try:
        # Store emergency data
        emergency_data = {
            'location': location,
            'species': species,
            'threat_level': threat_level,
            'urgency': urgency,
            'timestamp': datetime.utcnow(),
            'status': 'detected',
            'reported_by': current_user['_id']
        }
        
        result = db.emergencies.insert_one(emergency_data)
        emergency_data['_id'] = str(result.inserted_id)

        # Analyze cryo requirements
        cryo_analysis = analyze_cryo_requirements(species, location)
        
        # Plan delivery
        delivery_plan = plan_cryo_delivery(location, cryo_analysis)
        
        # Send alerts
        send_emergency_alerts(emergency_data, cryo_analysis, delivery_plan)

        return jsonify({
            'emergency': emergency_data,
            'cryo_analysis': cryo_analysis,
            'delivery_plan': delivery_plan
        }), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/emergency/<emergency_id>/status', methods=['GET'])
@token_required
def get_emergency_status(current_user, emergency_id):
    try:
        emergency = db.emergencies.find_one({'_id': ObjectId(emergency_id)})
        if not emergency:
            return jsonify({'message': 'Emergency not found'}), 404

        emergency['_id'] = str(emergency['_id'])
        return jsonify(emergency)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/emergency/<emergency_id>/monitor', methods=['POST'])
@token_required
def update_monitoring_status(current_user, emergency_id):
    data = request.json
    temperature = data.get('temperature')
    pressure = data.get('pressure')
    stability = data.get('stability')

    if not all([temperature, pressure, stability]):
        return jsonify({'message': 'Missing monitoring data'}), 400

    try:
        monitoring_data = {
            'temperature': temperature,
            'pressure': pressure,
            'stability': stability,
            'timestamp': datetime.utcnow(),
            'updated_by': current_user['_id']
        }

        db.emergencies.update_one(
            {'_id': ObjectId(emergency_id)},
            {
                '$push': {'monitoring_history': monitoring_data},
                '$set': {'last_monitoring': monitoring_data}
            }
        )

        # Check for any alerts
        alerts = check_monitoring_alerts(monitoring_data)
        if alerts:
            send_monitoring_alerts(emergency_id, alerts)

        return jsonify({'message': 'Monitoring data updated successfully'})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

def analyze_cryo_requirements(species, location):
    # In a real application, this would use AI/ML models to analyze requirements
    return {
        'recommended_cryo': 'Cryo-Protect X1',
        'estimated_time': '2 hours',
        'required_equipment': ['Temperature Control Unit', 'Preservation Kit'],
        'success_rate': 95,
        'special_requirements': ['Controlled temperature environment', 'Backup power supply']
    }

def plan_cryo_delivery(location, cryo_analysis):
    # In a real application, this would use routing algorithms
    return {
        'estimated_arrival': '1 hour 45 minutes',
        'route': 'Optimal route calculated',
        'required_personnel': 3,
        'equipment': cryo_analysis['required_equipment'],
        'backup_plan': 'Alternative route available'
    }

def send_emergency_alerts(emergency_data, cryo_analysis, delivery_plan):
    # Send email alerts
    email_message = f"""
    Emergency Alert!
    Species: {emergency_data['species']}
    Location: {emergency_data['location']['address']}
    Threat Level: {emergency_data['threat_level']}
    Urgency: {emergency_data['urgency']}
    
    Recommended Cryo: {cryo_analysis['recommended_cryo']}
    Estimated Time: {cryo_analysis['estimated_time']}
    Required Equipment: {', '.join(cryo_analysis['required_equipment'])}
    
    Delivery Plan:
    Estimated Arrival: {delivery_plan['estimated_arrival']}
    Required Personnel: {delivery_plan['required_personnel']}
    """

    send_email_alert(
        os.getenv('ALERT_EMAIL'),
        f"Emergency Alert - {emergency_data['species']}",
        email_message
    )

    # Send SMS alerts
    sms_message = f"Emergency Alert: {emergency_data['species']} at {emergency_data['location']['address']}. Threat Level: {emergency_data['threat_level']}"
    send_sms_alert(os.getenv('ALERT_PHONE'), sms_message)

    # Emit WebSocket event
    socketio.emit('new_emergency', {
        'emergency': emergency_data,
        'cryo_analysis': cryo_analysis,
        'delivery_plan': delivery_plan
    })

def check_monitoring_alerts(monitoring_data):
    alerts = []
    
    if monitoring_data['temperature'] < -196 or monitoring_data['temperature'] > -150:
        alerts.append(f"Temperature out of range: {monitoring_data['temperature']}°C")
    
    if monitoring_data['pressure'] < 1 or monitoring_data['pressure'] > 2:
        alerts.append(f"Pressure out of range: {monitoring_data['pressure']} bar")
    
    if monitoring_data['stability'] != 'Excellent':
        alerts.append(f"Stability issue: {monitoring_data['stability']}")
    
    return alerts

def send_monitoring_alerts(emergency_id, alerts):
    emergency = db.emergencies.find_one({'_id': ObjectId(emergency_id)})
    if not emergency:
        return

    alert_message = f"""
    Monitoring Alert for Emergency {emergency_id}
    Species: {emergency['species']}
    Location: {emergency['location']['address']}
    
    Alerts:
    {chr(10).join(alerts)}
    """

    send_email_alert(
        os.getenv('ALERT_EMAIL'),
        f"Monitoring Alert - Emergency {emergency_id}",
        alert_message
    )

    socketio.emit('monitoring_alert', {
        'emergency_id': emergency_id,
        'alerts': alerts,
        'timestamp': datetime.utcnow().isoformat()
    })

# WebSocket events
@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

# Error handling
@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Not found"}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal server error"}), 500

# Health check endpoint
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "services": {
            "mongodb": "connected" if mongo else "disconnected",
            "firebase": "connected" if firebase_admin else "disconnected"
        }
    })

if __name__ == '__main__':
    socketio.run(app, debug=True) 