import React, { useContext, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { AlertContext } from '../contexts/AlertContext';

const Alerts = () => {
  const { alert, hideAlert } = useContext(AlertContext);

  useEffect(() => {
    if (alert.open) {
      const timer = setTimeout(() => {
        hideAlert();
      }, alert.duration || 6000);

      return () => clearTimeout(timer);
    }
  }, [alert, hideAlert]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    hideAlert();
  };

  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={alert.duration || 6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{ mt: 8 }}
    >
      <Alert
        onClose={handleClose}
        severity={alert.severity || 'info'}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  );
};

export default Alerts; 