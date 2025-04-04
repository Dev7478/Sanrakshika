import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';
import { io } from 'socket.io-client';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const socket = io('http://localhost:5000');

const CryoMonitoring = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [monitoringData, setMonitoringData] = useState([]);
  const [newData, setNewData] = useState({
    temperature: '',
    pressure: '',
    humidity: '',
    location: '',
  });

  useEffect(() => {
    fetchLocations();
    fetchMonitoringData();

    socket.on('new_alert', (alert) => {
      console.log('New alert received:', alert);
      // Handle new alert (e.g., show notification)
    });

    return () => {
      socket.off('new_alert');
    };
  }, []);

  useEffect(() => {
    if (selectedLocation) {
      fetchMonitoringData();
    }
  }, [selectedLocation]);

  const fetchLocations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cryo-data');
      const uniqueLocations = [...new Set(response.data.map(item => item.location))];
      setLocations(uniqueLocations);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const fetchMonitoringData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/cryo-data?location=${selectedLocation}`);
      setMonitoringData(response.data);
    } catch (error) {
      console.error('Error fetching monitoring data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/cryo-data', newData);
      fetchMonitoringData();
      setNewData({
        temperature: '',
        pressure: '',
        humidity: '',
        location: '',
      });
    } catch (error) {
      console.error('Error adding monitoring data:', error);
    }
  };

  const chartData = {
    labels: monitoringData.map(item => new Date(item.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: monitoringData.map(item => item.temperature),
        borderColor: '#00f2ff',
        backgroundColor: 'rgba(0, 242, 255, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Pressure (bar)',
        data: monitoringData.map(item => item.pressure),
        borderColor: '#0066ff',
        backgroundColor: 'rgba(0, 102, 255, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Humidity (%)',
        data: monitoringData.map(item => item.humidity),
        borderColor: '#00ff9d',
        backgroundColor: 'rgba(0, 255, 157, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#fff',
        },
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#fff',
        },
      },
    },
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Cryo Monitoring System
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, background: 'rgba(255, 255, 255, 0.05)', height: 400 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Real-time Monitoring</Typography>
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Location</InputLabel>
                <Select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  label="Location"
                >
                  {locations.map((location) => (
                    <MenuItem key={location} value={location}>
                      {location}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Line data={chartData} options={chartOptions} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, background: 'rgba(255, 255, 255, 0.05)' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Add Monitoring Data
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Temperature (°C)"
                    type="number"
                    value={newData.temperature}
                    onChange={(e) => setNewData({ ...newData, temperature: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Pressure (bar)"
                    type="number"
                    value={newData.pressure}
                    onChange={(e) => setNewData({ ...newData, pressure: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Humidity (%)"
                    type="number"
                    value={newData.humidity}
                    onChange={(e) => setNewData({ ...newData, humidity: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Location"
                    value={newData.location}
                    onChange={(e) => setNewData({ ...newData, location: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      background: 'linear-gradient(135deg, #00f2ff, #0066ff)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #00e6f2, #0052cc)',
                      },
                    }}
                  >
                    Add Data
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CryoMonitoring; 