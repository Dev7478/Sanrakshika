import React from 'react';
import { createRoot } from 'react-dom/client';
import { Alert, Snackbar } from '@mui/material';

let alertRoot = null;

// Create a container for alerts if it doesn't exist
const createAlertContainer = () => {
  if (!document.getElementById('alert-container')) {
    const container = document.createElement('div');
    container.id = 'alert-container';
    document.body.appendChild(container);
  }
  return document.getElementById('alert-container');
};

// Initialize the alert root
const initializeAlertRoot = () => {
  if (!alertRoot) {
    const container = createAlertContainer();
    alertRoot = createRoot(container);
  }
};

// Alert component
const AlertComponent = ({ open, message, severity, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{
          width: '100%',
          '&.MuiAlert-standardSuccess': {
            backgroundColor: '#2e7d32',
          },
          '&.MuiAlert-standardError': {
            backgroundColor: '#d32f2f',
          },
          '&.MuiAlert-standardWarning': {
            backgroundColor: '#ed6c02',
          },
          '&.MuiAlert-standardInfo': {
            backgroundColor: '#0288d1',
          },
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

// Show alert function
export const showAlert = (message, severity = 'info') => {
  initializeAlertRoot();

  const handleClose = () => {
    alertRoot.render(null);
  };

  alertRoot.render(
    <AlertComponent
      open={true}
      message={message}
      severity={severity}
      onClose={handleClose}
    />
  );
};

// Convenience functions for different alert types
export const showSuccessAlert = (message) => showAlert(message, 'success');
export const showErrorAlert = (message) => showAlert(message, 'error');
export const showWarningAlert = (message) => showAlert(message, 'warning');
export const showInfoAlert = (message) => showAlert(message, 'info'); 