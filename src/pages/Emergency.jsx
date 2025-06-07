import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Paper, Button, Snackbar, Alert, CircularProgress, Slider, TextField } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SecurityIcon from '@mui/icons-material/Security';
import GroupsIcon from '@mui/icons-material/Groups';
import WarningIcon from '@mui/icons-material/Warning';
import emailjs from '@emailjs/browser';
import { useAuth } from '../contexts/AuthContext';

// Initialize EmailJS
if (import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
  emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
} else {
  console.warn('EmailJS public key not found in environment variables');
}

// Mock data for monitoring
const mockMonitoringData = {
  temperature: 25,
  humidity: 60,
  population: 120,
  poachingRisk: 30
};

// Threshold values
const thresholds = {
  temperature: { min: 15, max: 30, unit: '°C' },
  humidity: { min: 40, max: 80, unit: '%' },
  population: { min: 100, max: 150, unit: 'individuals' },
  poachingRisk: { min: 0, max: 50, unit: '%' }
};

const Emergency = () => {
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(true);
  const [monitoringData, setMonitoringData] = useState(mockMonitoringData);
  const [autoAlertEnabled, setAutoAlertEnabled] = useState(true);
  const [alertThresholds, setAlertThresholds] = useState(thresholds);
  const [phoneNumber, setPhoneNumber] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    // Set loading to false after component mounts
    setLoading(false);
    
    // Initialize phone number from currentUser if available
    if (currentUser?.phoneNumber) {
      setPhoneNumber(currentUser.phoneNumber);
    }
    
    // Set up interval to simulate monitoring data changes
    const interval = setInterval(() => {
      setMonitoringData(prevData => {
        // Simulate random changes in monitoring data
        const newData = {
          temperature: prevData.temperature + (Math.random() * 2 - 1),
          humidity: prevData.humidity + (Math.random() * 4 - 2),
          population: prevData.population + (Math.random() * 2 - 1),
          poachingRisk: prevData.poachingRisk + (Math.random() * 4 - 2)
        };
        
        // Check if any thresholds are crossed
        if (autoAlertEnabled) {
          checkThresholds(newData);
        }
        
        return newData;
      });
    }, 5000); // Update every 5 seconds
    
    return () => clearInterval(interval);
  }, [autoAlertEnabled, currentUser]);

  // Function to send SMS via Flask backend
  const sendEmergencySMS = async (type, customMessage = null) => {
    try {
      const message = customMessage || `A ${type} emergency has been reported at ${new Date().toLocaleString()}. Our response team has been notified and will be dispatched shortly.`;
      
      if (!phoneNumber) {
        throw new Error('Phone number not provided');
      }

      // Send SMS via your Flask backend
      const smsResponse = await fetch('http://localhost:5000/send-emergency-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: phoneNumber,
          message: `EMERGENCY ALERT: ${message}`
        }),
      });

      const smsData = await smsResponse.json();
      
      if (!smsData.success) {
        throw new Error(smsData.error || 'Failed to send SMS');
      }
      
      return smsData;
    } catch (error) {
      console.error('Error sending SMS:', error);
      throw error;
    }
  };

  // Function to check if thresholds are crossed
  const checkThresholds = (data) => {
    let alerts = [];
    
    // Check temperature
    if (data.temperature < alertThresholds.temperature.min) {
      alerts.push({
        type: 'Medical',
        message: `Temperature (${data.temperature.toFixed(1)}°C) is below the minimum threshold (${alertThresholds.temperature.min}°C). This may affect animal health.`
      });
    } else if (data.temperature > alertThresholds.temperature.max) {
      alerts.push({
        type: 'Medical',
        message: `Temperature (${data.temperature.toFixed(1)}°C) is above the maximum threshold (${alertThresholds.temperature.max}°C). This may affect animal health.`
      });
    }
    
    // Check humidity
    if (data.humidity < alertThresholds.humidity.min) {
      alerts.push({
        type: 'Medical',
        message: `Humidity (${data.humidity.toFixed(1)}%) is below the minimum threshold (${alertThresholds.humidity.min}%). This may affect animal health.`
      });
    } else if (data.humidity > alertThresholds.humidity.max) {
      alerts.push({
        type: 'Medical',
        message: `Humidity (${data.humidity.toFixed(1)}%) is above the maximum threshold (${alertThresholds.humidity.max}%). This may affect animal health.`
      });
    }
    
    // Check population
    if (data.population < alertThresholds.population.min) {
      alerts.push({
        type: 'Security',
        message: `Population (${Math.round(data.population)}) is below the minimum threshold (${alertThresholds.population.min}). Possible poaching or migration issue.`
      });
    } else if (data.population > alertThresholds.population.max) {
      alerts.push({
        type: 'Security',
        message: `Population (${Math.round(data.population)}) is above the maximum threshold (${alertThresholds.population.max}). Possible overcrowding issue.`
      });
    }
    
    // Check poaching risk
    if (data.poachingRisk > alertThresholds.poachingRisk.max) {
      alerts.push({
        type: 'Security',
        message: `Poaching risk (${data.poachingRisk.toFixed(1)}%) is above the maximum threshold (${alertThresholds.poachingRisk.max}%). Immediate security response may be needed.`
      });
    }
    
    // Send alerts if any thresholds are crossed
    alerts.forEach(alert => {
      handleEmergencyAlert(alert.type, alert.message);
    });
  };

  const handleEmergencyAlert = async (type, customMessage = null) => {
    try {
      const message = customMessage || `A ${type} emergency has been reported at ${new Date().toLocaleString()}. Our response team has been notified and will be dispatched shortly.`;
      
      // Prepare email content
      const emailContent = {
        to_email: currentUser?.email || 'default@example.com',
        to_name: currentUser?.displayName || 'User',
        emergency_type: type,
        timestamp: new Date().toLocaleString(),
        message: message
      };

      // Send both email and SMS in parallel
      const results = await Promise.allSettled([
        emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          emailContent
        ),
        sendEmergencySMS(type, message)
      ]);
      
      const emailSuccess = results[0].status === 'fulfilled';
      const smsSuccess = results[1].status === 'fulfilled';
      
      if (emailSuccess && smsSuccess) {
        setNotification({
          open: true,
          message: `${type} emergency alert sent via SMS and email!`,
          severity: 'success'
        });
      } else if (emailSuccess) {
        setNotification({
          open: true,
          message: `${type} alert sent via email (SMS failed)`,
          severity: 'warning'
        });
      } else if (smsSuccess) {
        setNotification({
          open: true,
          message: `${type} alert sent via SMS (email failed)`,
          severity: 'warning'
        });
      } else {
        throw new Error('Both email and SMS failed');
      }
    } catch (error) {
      console.error('Error sending emergency alert:', error);
      setNotification({
        open: true,
        message: `Failed to send emergency alert: ${error.message}`,
        severity: 'error'
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const handleThresholdChange = (parameter, value) => {
    setAlertThresholds(prev => ({
      ...prev,
      [parameter]: {
        ...prev[parameter],
        [value.type]: value.value
      }
    }));
  };

  // Show loading spinner while component is loading
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', pt: 10, pb: 6, background: 'linear-gradient(135deg, #0a192f 0%, #112240 100%)' }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              color: 'white',
              background: 'linear-gradient(135deg, #00f2ff, #0066ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Emergency Response
          </Typography>
        </Box>

        {/* Phone Number Input */}
        <Box sx={{ mb: 4 }}>
          <TextField
            label="Emergency Contact Number"
            variant="outlined"
            fullWidth
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+1234567890"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: '#00f2ff',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)',
              },
              '& .MuiInputBase-input': {
                color: 'white',
              },
            }}
          />
          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)', mt: 1, display: 'block' }}>
            This number will receive SMS alerts for emergencies
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Medical Response Section */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                height: '100%',
                background: 'rgba(17, 34, 64, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocalHospitalIcon sx={{ color: '#00f2ff', mr: 1 }} />
                <Typography variant="h5" sx={{ color: 'white' }}>
                  Medical Response
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)', mb: 2 }}>
                Our veterinary teams are ready 24/7 to provide immediate medical attention to injured or sick animals.
              </Typography>
              <Button
                variant="contained"
                onClick={() => handleEmergencyAlert('Medical')}
                sx={{
                  background: 'linear-gradient(135deg, #00f2ff, #0066ff)',
                  color: '#ffffff',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #00d8e6, #0052cc)',
                  },
                }}
              >
                Report Medical Emergency
              </Button>
            </Paper>
          </Grid>

          {/* Security Response Section */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                height: '100%',
                background: 'rgba(17, 34, 64, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SecurityIcon sx={{ color: '#00f2ff', mr: 1 }} />
                <Typography variant="h5" sx={{ color: 'white' }}>
                  Security Response
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)', mb: 2 }}>
                Rapid deployment of security teams to protect species from poaching and habitat destruction.
              </Typography>
              <Button
                variant="contained"
                onClick={() => handleEmergencyAlert('Security')}
                sx={{
                  background: 'linear-gradient(135deg, #00f2ff, #0066ff)',
                  color: '#ffffff',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #00d8e6, #0052cc)',
                  },
                }}
              >
                Report Security Threat
              </Button>
            </Paper>
          </Grid>

          {/* Monitoring Section */}
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 3,
                background: 'rgba(17, 34, 64, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <WarningIcon sx={{ color: '#00f2ff', mr: 1 }} />
                <Typography variant="h5" sx={{ color: 'white' }}>
                  Automated Monitoring
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)', mb: 2 }}>
                Real-time monitoring of environmental conditions and species population. Alerts will be automatically sent when thresholds are crossed.
              </Typography>
              
              <Grid container spacing={3}>
                {/* Temperature Monitoring */}
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ color: 'white', mb: 1 }}>
                      Temperature: {monitoringData.temperature.toFixed(1)}°C
                    </Typography>
                    <Slider
                      value={[alertThresholds.temperature.min, alertThresholds.temperature.max]}
                      onChange={(e, newValue) => {
                        handleThresholdChange('temperature', { type: 'min', value: newValue[0] });
                        handleThresholdChange('temperature', { type: 'max', value: newValue[1] });
                      }}
                      valueLabelDisplay="auto"
                      min={0}
                      max={40}
                      sx={{ color: '#00f2ff' }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        Min: {alertThresholds.temperature.min}°C
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        Max: {alertThresholds.temperature.max}°C
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                
                {/* Humidity Monitoring */}
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ color: 'white', mb: 1 }}>
                      Humidity: {monitoringData.humidity.toFixed(1)}%
                    </Typography>
                    <Slider
                      value={[alertThresholds.humidity.min, alertThresholds.humidity.max]}
                      onChange={(e, newValue) => {
                        handleThresholdChange('humidity', { type: 'min', value: newValue[0] });
                        handleThresholdChange('humidity', { type: 'max', value: newValue[1] });
                      }}
                      valueLabelDisplay="auto"
                      min={0}
                      max={100}
                      sx={{ color: '#00f2ff' }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        Min: {alertThresholds.humidity.min}%
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        Max: {alertThresholds.humidity.max}%
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                
                {/* Population Monitoring */}
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ color: 'white', mb: 1 }}>
                      Population: {Math.round(monitoringData.population)} individuals
                    </Typography>
                    <Slider
                      value={[alertThresholds.population.min, alertThresholds.population.max]}
                      onChange={(e, newValue) => {
                        handleThresholdChange('population', { type: 'min', value: newValue[0] });
                        handleThresholdChange('population', { type: 'max', value: newValue[1] });
                      }}
                      valueLabelDisplay="auto"
                      min={0}
                      max={200}
                      sx={{ color: '#00f2ff' }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        Min: {alertThresholds.population.min} individuals
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        Max: {alertThresholds.population.max} individuals
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                
                {/* Poaching Risk Monitoring */}
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ color: 'white', mb: 1 }}>
                      Poaching Risk: {monitoringData.poachingRisk.toFixed(1)}%
                    </Typography>
                    <Slider
                      value={[alertThresholds.poachingRisk.min, alertThresholds.poachingRisk.max]}
                      onChange={(e, newValue) => {
                        handleThresholdChange('poachingRisk', { type: 'min', value: newValue[0] });
                        handleThresholdChange('poachingRisk', { type: 'max', value: newValue[1] });
                      }}
                      valueLabelDisplay="auto"
                      min={0}
                      max={100}
                      sx={{ color: '#00f2ff' }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        Min: {alertThresholds.poachingRisk.min}%
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        Max: {alertThresholds.poachingRisk.max}%
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant={autoAlertEnabled ? "contained" : "outlined"}
                  onClick={() => setAutoAlertEnabled(!autoAlertEnabled)}
                  sx={{
                    background: autoAlertEnabled ? 'linear-gradient(135deg, #00f2ff, #0066ff)' : 'transparent',
                    color: '#ffffff',
                    borderColor: '#00f2ff',
                    '&:hover': {
                      background: autoAlertEnabled ? 'linear-gradient(135deg, #00d8e6, #0052cc)' : 'rgba(0, 242, 255, 0.1)',
                      borderColor: '#00f2ff',
                    },
                  }}
                >
                  {autoAlertEnabled ? "Disable Auto-Alerts" : "Enable Auto-Alerts"}
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Response Teams Section */}
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 3,
                background: 'rgba(17, 34, 64, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <GroupsIcon sx={{ color: '#00f2ff', mr: 1 }} />
                <Typography variant="h5" sx={{ color: 'white' }}>
                  Response Teams
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)', mb: 2 }}>
                Our specialized response teams are trained to handle various emergency situations:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                    • Wildlife Rescue Team
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                    • Habitat Protection Unit
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                    • Emergency Medical Unit
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        {/* Notification Snackbar */}
        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseNotification}
            severity={notification.severity}
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Emergency; 