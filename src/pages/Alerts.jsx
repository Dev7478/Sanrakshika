import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Alert,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  NotificationsActive as AlertIcon,
  Close as CloseIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon
} from '@mui/icons-material';

const Alerts = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'warning',
      message: 'Tiger population in Sundarbans showing decline',
      timestamp: new Date().toISOString(),
      location: 'Sundarbans, West Bengal'
    },
    {
      id: 2,
      type: 'error',
      message: 'Critical habitat destruction detected',
      timestamp: new Date().toISOString(),
      location: 'Kaziranga National Park'
    },
    {
      id: 3,
      type: 'info',
      message: 'New species discovered in Western Ghats',
      timestamp: new Date().toISOString(),
      location: 'Western Ghats'
    }
  ]);

  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning':
        return <WarningIcon color="warning" />;
      case 'error':
        return <ErrorIcon color="error" />;
      case 'info':
        return <InfoIcon color="info" />;
      default:
        return <AlertIcon />;
    }
  };

  const handleCloseAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ 
        color: 'primary.main',
        fontWeight: 'bold',
        mb: 4
      }}>
        Conservation Alerts
      </Typography>

      <Grid container spacing={3}>
        {alerts.map((alert) => (
          <Grid item xs={12} md={6} key={alert.id}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'flex-start',
                gap: 2,
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                position: 'relative'
              }}
            >
              <Box sx={{ color: `${alert.type}.main` }}>
                {getAlertIcon(alert.type)}
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {alert.message}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Location: {alert.location}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(alert.timestamp).toLocaleString()}
                </Typography>
              </Box>
              <Tooltip title="Dismiss">
                <IconButton
                  size="small"
                  onClick={() => handleCloseAlert(alert.id)}
                  sx={{ position: 'absolute', top: 8, right: 8 }}
                >
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Alerts; 