import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  LinearProgress,
  Alert,
  Chip,
} from '@mui/material';
import {
  LocationOn,
  Science,
  LocalShipping,
  CheckCircle,
  Warning,
} from '@mui/icons-material';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const steps = [
  'Location Detection',
  'Cryo Analysis',
  'Delivery Planning',
  'Implementation',
  'Monitoring',
  'Success Confirmation',
];

const EmergencyResponse = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [location, setLocation] = useState(null);
  const [cryoAnalysis, setCryoAnalysis] = useState(null);
  const [deliveryPlan, setDeliveryPlan] = useState(null);
  const [implementationStatus, setImplementationStatus] = useState(null);
  const [monitoringData, setMonitoringData] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = {
    lat: 20.5937, // Default to India's center
    lng: 78.9629,
  };

  useEffect(() => {
    // Simulate emergency detection
    detectEmergency();
  }, []);

  const detectEmergency = async () => {
    try {
      // In a real application, this would come from sensors or monitoring systems
      const mockEmergencyData = {
        location: {
          lat: 20.5937 + (Math.random() - 0.5) * 2,
          lng: 78.9629 + (Math.random() - 0.5) * 2,
          address: 'Wildlife Sanctuary, Karnataka',
        },
        species: 'Bengal Tiger',
        threatLevel: 'Critical',
        urgency: 'Immediate',
      };

      setLocation(mockEmergencyData.location);
      analyzeCryo(mockEmergencyData);
    } catch (error) {
      setError('Failed to detect emergency location');
    }
  };

  const analyzeCryo = async (emergencyData) => {
    try {
      // In a real application, this would analyze the species and environmental conditions
      const analysis = {
        recommendedCryo: 'Cryo-Protect X1',
        estimatedTime: '2 hours',
        requiredEquipment: ['Temperature Control Unit', 'Preservation Kit'],
        successRate: 95,
      };

      setCryoAnalysis(analysis);
      planDelivery(analysis, emergencyData.location);
    } catch (error) {
      setError('Failed to analyze cryo requirements');
    }
  };

  const planDelivery = async (analysis, location) => {
    try {
      // In a real application, this would calculate optimal routes and timing
      const plan = {
        estimatedArrival: '1 hour 45 minutes',
        route: 'Optimal route calculated',
        requiredPersonnel: 3,
        equipment: analysis.requiredEquipment,
      };

      setDeliveryPlan(plan);
      startImplementation(plan);
    } catch (error) {
      setError('Failed to plan delivery');
    }
  };

  const startImplementation = async (plan) => {
    try {
      // Simulate implementation process
      const status = {
        progress: 0,
        currentStep: 'Preparing cryo equipment',
        estimatedCompletion: '30 minutes',
      };

      setImplementationStatus(status);
      simulateProgress(status);
    } catch (error) {
      setError('Failed to start implementation');
    }
  };

  const simulateProgress = (status) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (progress >= 100) {
        clearInterval(interval);
        setSuccess(true);
        startMonitoring();
      } else {
        setImplementationStatus({
          ...status,
          progress,
        });
      }
    }, 2000);
  };

  const startMonitoring = async () => {
    try {
      // Simulate monitoring data
      const monitoring = {
        temperature: -196,
        pressure: 1.5,
        stability: 'Excellent',
        lastUpdate: new Date().toISOString(),
      };

      setMonitoringData(monitoring);
    } catch (error) {
      setError('Failed to start monitoring');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #00f2ff, #0066ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Emergency Response System
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Location Detection
            </Typography>
            {location && (
              <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={location}
                  zoom={10}
                >
                  <Marker position={location} />
                </GoogleMap>
              </LoadScript>
            )}
            {location && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Address: {location.address}
                </Typography>
                <Chip
                  icon={<Warning />}
                  label="Critical Threat Level"
                  color="error"
                  sx={{ mt: 1 }}
                />
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          {cryoAnalysis && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Cryo Analysis
                </Typography>
                <Typography variant="body2">
                  Recommended Cryo: {cryoAnalysis.recommendedCryo}
                </Typography>
                <Typography variant="body2">
                  Estimated Time: {cryoAnalysis.estimatedTime}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Required Equipment:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                  {cryoAnalysis.requiredEquipment.map((equipment) => (
                    <Chip
                      key={equipment}
                      label={equipment}
                      size="small"
                      sx={{ background: 'rgba(0, 242, 255, 0.1)' }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          )}

          {deliveryPlan && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Delivery Plan
                </Typography>
                <Typography variant="body2">
                  Estimated Arrival: {deliveryPlan.estimatedArrival}
                </Typography>
                <Typography variant="body2">
                  Required Personnel: {deliveryPlan.requiredPersonnel}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Route: {deliveryPlan.route}
                </Typography>
              </CardContent>
            </Card>
          )}

          {implementationStatus && (
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Implementation Status
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Current Step: {implementationStatus.currentStep}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={implementationStatus.progress}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(90deg, #00f2ff, #0066ff)',
                    },
                  }}
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Progress: {implementationStatus.progress}%
                </Typography>
              </CardContent>
            </Card>
          )}

          {monitoringData && (
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Monitoring Status
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2">Temperature</Typography>
                    <Typography variant="h6">{monitoringData.temperature}°C</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">Pressure</Typography>
                    <Typography variant="h6">{monitoringData.pressure} bar</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">Stability</Typography>
                    <Chip
                      icon={<CheckCircle />}
                      label={monitoringData.stability}
                      color="success"
                      size="small"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}

          {success && (
            <Alert
              severity="success"
              sx={{ mt: 3 }}
              icon={<CheckCircle />}
            >
              Cryo implementation successful! Monitoring in progress.
            </Alert>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmergencyResponse; 