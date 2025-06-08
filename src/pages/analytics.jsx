import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
} from 'chart.js';
import { Line, Bar, Pie, Radar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
);

// Update the chart options to maintain aspect ratio
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#fff',
        font: {
          size: 12
        }
      }
    }
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      ticks: {
        color: '#fff'
      }
    },
    y: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      ticks: {
        color: '#fff'
      }
    }
  }
};

// Update the analytics data with more animals
const analyticsData = {
  populationTrends: {
    labels: ['2019', '2020', '2021', '2022', '2023'],
    datasets: [
      {
        label: 'Bengal Tiger',
        data: [2967, 3100, 3250, 3400, 3600],
        borderColor: '#00f2ff',
        backgroundColor: 'rgba(0, 242, 255, 0.1)',
        tension: 0.4
      },
      {
        label: 'Indian Elephant',
        data: [27312, 27500, 27800, 28000, 28500],
        borderColor: '#0066ff',
        backgroundColor: 'rgba(0, 102, 255, 0.1)',
        tension: 0.4
      },
      {
        label: 'Indian Rhinoceros',
        data: [3600, 3650, 3700, 3750, 3800],
        borderColor: '#ff3366',
        backgroundColor: 'rgba(255, 51, 102, 0.1)',
        tension: 0.4
      },
      {
        label: 'Asiatic Lion',
        data: [523, 550, 580, 600, 625],
        borderColor: '#ffd700',
        backgroundColor: 'rgba(255, 215, 0, 0.1)',
        tension: 0.4
      },
      {
        label: 'Snow Leopard',
        data: [450, 470, 490, 510, 530],
        borderColor: '#9370db',
        backgroundColor: 'rgba(147, 112, 219, 0.1)',
        tension: 0.4
      },
      {
        label: 'Red Panda',
        data: [2500, 2600, 2700, 2800, 2900],
        borderColor: '#ff4500',
        backgroundColor: 'rgba(255, 69, 0, 0.1)',
        tension: 0.4
      }
    ]
  },
  conservationStatus: {
    labels: ['Critically Endangered', 'Endangered', 'Vulnerable', 'Near Threatened', 'Least Concern'],
    datasets: [{
      data: [15, 25, 30, 20, 10],
      backgroundColor: [
        '#ff3366',
        '#ff6b6b',
        '#ffd93d',
        '#6bff6b',
        '#4dff88'
      ],
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1
    }]
  },
  habitatDistribution: {
    labels: ['Forest', 'Grassland', 'Wetland', 'Mountain', 'Desert', 'Coastal'],
    datasets: [{
      label: 'Species Count',
      data: [45, 30, 25, 20, 15, 10],
      backgroundColor: 'rgba(0, 242, 255, 0.6)',
      borderColor: '#00f2ff',
      borderWidth: 1
    }]
  },
  conservationMetrics: {
    labels: ['Population Growth', 'Habitat Protection', 'Anti-Poaching', 'Community Engagement', 'Research & Monitoring'],
    datasets: [
      {
        label: 'Current Year',
        data: [85, 75, 90, 80, 70],
        backgroundColor: 'rgba(0, 242, 255, 0.2)',
        borderColor: '#00f2ff',
        pointBackgroundColor: '#00f2ff'
      },
      {
        label: 'Previous Year',
        data: [70, 65, 80, 70, 60],
        backgroundColor: 'rgba(0, 102, 255, 0.2)',
        borderColor: '#0066ff',
        pointBackgroundColor: '#0066ff'
      }
    ]
  }
};

const Analytics = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('5Y');
  const [selectedSpecies, setSelectedSpecies] = useState('all');

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button 
          variant="contained" 
          onClick={() => navigate('/')}
          sx={{ 
            backgroundColor: '#00f2ff',
            '&:hover': {
              backgroundColor: '#00d6e6'
            }
          }}
        >
          Return to Home
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      pt: 12,
      pb: 8,
      background: 'linear-gradient(135deg, #0a192f 0%, #112240 100%)'
    }}>
      <Container maxWidth="lg">
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <CircularProgress sx={{ color: '#00f2ff' }} />
          </Box>
        ) : (
          <>
            <Typography
              variant="h2"
              sx={{
                textAlign: 'center',
                mb: 6,
                fontWeight: 700,
                background: 'linear-gradient(135deg, #00f2ff, #0066ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Conservation Analytics
            </Typography>

            {/* Filters */}
            <Grid container spacing={4} sx={{ mb: 6 }}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: '#00f2ff' }}>Time Range</InputLabel>
                  <Select
                    value={timeRange}
                    label="Time Range"
                    onChange={(e) => setTimeRange(e.target.value)}
                    sx={{ 
                      backgroundColor: 'rgba(17, 34, 64, 0.8)',
                      color: '#fff',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#00f2ff',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#00f2ff',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#00f2ff',
                      },
                      '& .MuiSvgIcon-root': {
                        color: '#00f2ff',
                      }
                    }}
                  >
                    <MenuItem value="1Y" sx={{ color: '#000' }}>Last Year</MenuItem>
                    <MenuItem value="3Y" sx={{ color: '#000' }}>Last 3 Years</MenuItem>
                    <MenuItem value="5Y" sx={{ color: '#000' }}>Last 5 Years</MenuItem>
                    <MenuItem value="10Y" sx={{ color: '#000' }}>Last 10 Years</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: '#00f2ff' }}>Species</InputLabel>
                  <Select
                    value={selectedSpecies}
                    label="Species"
                    onChange={(e) => setSelectedSpecies(e.target.value)}
                    sx={{ 
                      backgroundColor: 'rgba(17, 34, 64, 0.8)',
                      color: '#fff',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#00f2ff',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#00f2ff',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#00f2ff',
                      },
                      '& .MuiSvgIcon-root': {
                        color: '#00f2ff',
                      }
                    }}
                  >
                    <MenuItem value="all" sx={{ color: '#000' }}>All Species</MenuItem>
                    <MenuItem value="tiger" sx={{ color: '#000' }}>Bengal Tiger</MenuItem>
                    <MenuItem value="elephant" sx={{ color: '#000' }}>Indian Elephant</MenuItem>
                    <MenuItem value="rhino" sx={{ color: '#000' }}>Indian Rhinoceros</MenuItem>
                    <MenuItem value="lion" sx={{ color: '#000' }}>Asiatic Lion</MenuItem>
                    <MenuItem value="leopard" sx={{ color: '#000' }}>Snow Leopard</MenuItem>
                    <MenuItem value="panda" sx={{ color: '#000' }}>Red Panda</MenuItem>
                    <MenuItem value="bison" sx={{ color: '#000' }}>Indian Bison</MenuItem>
                    <MenuItem value="deer" sx={{ color: '#000' }}>Sangai Deer</MenuItem>
                    <MenuItem value="ass" sx={{ color: '#000' }}>Indian Wild Ass</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Charts Grid */}
            <Grid container spacing={4}>
              {/* Population Trends */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 4,
                    background: 'rgba(17, 34, 64, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(0, 242, 255, 0.2)',
                    height: '450px',
                    borderRadius: 2,
                    boxShadow: '0 4px 30px rgba(0, 242, 255, 0.1)'
                  }}
                >
                  <Typography variant="h6" sx={{ color: '#00f2ff', mb: 3, fontWeight: 600 }}>
                    Population Trends
                  </Typography>
                  <Box sx={{ height: '350px' }}>
                    <Line data={analyticsData.populationTrends} options={chartOptions} />
                  </Box>
                </Paper>
              </Grid>

              {/* Conservation Status */}
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: 4,
                    background: 'rgba(17, 34, 64, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(0, 242, 255, 0.2)',
                    height: '450px',
                    borderRadius: 2,
                    boxShadow: '0 4px 30px rgba(0, 242, 255, 0.1)'
                  }}
                >
                  <Typography variant="h6" sx={{ color: '#00f2ff', mb: 3, fontWeight: 600 }}>
                    Conservation Status Distribution
                  </Typography>
                  <Box sx={{ height: '350px' }}>
                    <Pie data={analyticsData.conservationStatus} options={chartOptions} />
                  </Box>
                </Paper>
              </Grid>

              {/* Habitat Distribution */}
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: 4,
                    background: 'rgba(17, 34, 64, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(0, 242, 255, 0.2)',
                    height: '450px',
                    borderRadius: 2,
                    boxShadow: '0 4px 30px rgba(0, 242, 255, 0.1)'
                  }}
                >
                  <Typography variant="h6" sx={{ color: '#00f2ff', mb: 3, fontWeight: 600 }}>
                    Habitat Distribution
                  </Typography>
                  <Box sx={{ height: '350px' }}>
                    <Bar data={analyticsData.habitatDistribution} options={chartOptions} />
                  </Box>
                </Paper>
              </Grid>

              {/* Conservation Metrics */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 4,
                    background: 'rgba(17, 34, 64, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(0, 242, 255, 0.2)',
                    height: '450px',
                    borderRadius: 2,
                    boxShadow: '0 4px 30px rgba(0, 242, 255, 0.1)'
                  }}
                >
                  <Typography variant="h6" sx={{ color: '#00f2ff', mb: 3, fontWeight: 600 }}>
                    Conservation Success Metrics
                  </Typography>
                  <Box sx={{ height: '350px' }}>
                    <Radar data={analyticsData.conservationMetrics} options={chartOptions} />
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </Box>
  );
};

export default Analytics; 