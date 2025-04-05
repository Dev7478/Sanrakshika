// Email templates for different types of notifications

export const emergencyEmailTemplate = {
  subject: "Emergency Alert: {{emergency_type}} Emergency Reported",
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <h2 style="color: #0066ff; margin-bottom: 20px;">Emergency Alert</h2>
      <p>Hello {{to_name}},</p>
      <p>A <strong>{{emergency_type}}</strong> emergency has been reported at <strong>{{timestamp}}</strong>.</p>
      <p>{{message}}</p>
      <p>Our response team has been notified and will be dispatched shortly.</p>
      <div style="margin-top: 30px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
        <h3 style="margin-top: 0; color: #333;">Emergency Details:</h3>
        <ul style="list-style-type: none; padding-left: 0;">
          <li><strong>Type:</strong> {{emergency_type}}</li>
          <li><strong>Time:</strong> {{timestamp}}</li>
        </ul>
      </div>
      <p style="margin-top: 30px; font-size: 14px; color: #666;">
        This is an automated message from Sanrakshika Wildlife Conservation System.
        Please do not reply to this email.
      </p>
    </div>
  `
}; 