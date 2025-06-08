import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import RefreshIcon from '@mui/icons-material/Refresh';
import MapIcon from '@mui/icons-material/Map';

const monitoringData = {
  species: [
    {
      id: 1,
      name: 'Bengal Tiger',
      population: 2500,
      trend: 'Increasing',
      status: 'Endangered',
      location: 'Kaziranga National Park',
      lastUpdate: '2024-03-15',
      image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 2,
      name: 'Snow Leopard',
      population: 450,
      trend: 'Stable',
      status: 'Vulnerable',
      location: 'Himalayan Region',
      lastUpdate: '2024-03-14',
      image: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 3,
      name: 'Giant Panda',
      population: 1864,
      trend: 'Increasing',
      status: 'Vulnerable',
      location: 'Sichuan Province',
      lastUpdate: '2024-03-13',
      image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    }
  ],
  alerts: [
    {
      id: 1,
      type: 'Movement Alert',
      species: 'Bengal Tiger',
      location: 'Kaziranga National Park',
      timestamp: '2024-03-15 14:30',
      severity: 'Low'
    },
    {
      id: 2,
      type: 'Population Alert',
      species: 'Snow Leopard',
      location: 'Himalayan Region',
      timestamp: '2024-03-14 09:15',
      severity: 'Medium'
    },
    {
      id: 3,
      type: 'Habitat Alert',
      species: 'Giant Panda',
      location: 'Sichuan Province',
      timestamp: '2024-03-13 16:45',
      severity: 'High'
    }
  ]
};

const Monitoring = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', pt: 10, pb: 6, background: 'linear-gradient(135deg, #0a192f 0%, #112240 100%)' }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ mb: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography
            variant="h2"
            sx={{
              color: 'white',
              background: 'linear-gradient(135deg, #00f2ff, #0066ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Species Monitoring
          </Typography>
          <IconButton sx={{ color: 'white' }}>
            <RefreshIcon />
          </IconButton>
        </Box>

        {/* Overview Cards */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={4}>
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
                <LocationOnIcon sx={{ color: '#00f2ff', mr: 1 }} />
                <Typography variant="h5" sx={{ color: 'white' }}>
                  Active Tracking
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ color: '#00f2ff', mb: 1 }}>
                15
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                Species currently being monitored across different regions
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
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
                <TrendingUpIcon sx={{ color: '#00f2ff', mr: 1 }} />
                <Typography variant="h5" sx={{ color: 'white' }}>
                  Population Trends
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ color: '#00f2ff', mb: 1 }}>
                2,814
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                Total individuals being tracked across all species
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
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
                <NotificationsActiveIcon sx={{ color: '#00f2ff', mr: 1 }} />
                <Typography variant="h5" sx={{ color: 'white' }}>
                  Active Alerts
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ color: '#00f2ff', mb: 1 }}>
                3
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                Current alerts requiring attention
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Species Cards */}
        <Typography variant="h4" sx={{ color: 'white', mb: 4 }}>
          Monitored Species
        </Typography>
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {monitoringData.species.map((species) => (
            <Grid item xs={12} md={4} key={species.id}>
              <Card sx={{ 
                height: '100%',
                background: 'rgba(17, 34, 64, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={species.image}
                  alt={species.name}
                />
                <CardContent>
                  <Typography variant="h5" sx={{ color: 'white', mb: 1 }}>
                    {species.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}>
                    {species.location}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Chip
                      icon={species.trend === 'Increasing' ? <TrendingUpIcon /> : <TrendingUpIcon />}
                      label={species.trend}
                      color={species.trend === 'Increasing' ? 'success' : 'warning'}
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Chip
                      label={species.status}
                      color="error"
                      size="small"
                    />
                  </Box>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Population: {species.population}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Last Update: {species.lastUpdate}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Alerts Table */}
        <Typography variant="h4" sx={{ color: 'white', mb: 4 }}>
          Recent Alerts
        </Typography>
        <TableContainer component={Paper} sx={{ 
          background: 'rgba(17, 34, 64, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          mb: 6
        }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'white' }}>Type</TableCell>
                <TableCell sx={{ color: 'white' }}>Species</TableCell>
                <TableCell sx={{ color: 'white' }}>Location</TableCell>
                <TableCell sx={{ color: 'white' }}>Timestamp</TableCell>
                <TableCell sx={{ color: 'white' }}>Severity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {monitoringData.alerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>{alert.type}</TableCell>
                  <TableCell sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>{alert.species}</TableCell>
                  <TableCell sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>{alert.location}</TableCell>
                  <TableCell sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>{alert.timestamp}</TableCell>
                  <TableCell>
                    <Chip
                      label={alert.severity}
                      color={
                        alert.severity === 'High' ? 'error' :
                        alert.severity === 'Medium' ? 'warning' : 'success'
                      }
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Map Section */}
        <Typography variant="h4" sx={{ color: 'white', mb: 4 }}>
          Species Distribution Map
        </Typography>
        <Paper
          sx={{
            p: 3,
            height: '500px',
            background: 'rgba(17, 34, 64, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            mb: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            '&:hover': {
              background: 'rgba(17, 34, 64, 0.9)',
            }
          }}
          onClick={() => navigate('/map')}
        >
          <MapIcon sx={{ fontSize: 60, color: '#00f2ff', mb: 2 }} />
          <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            View Interactive Map
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Click to explore real-time species tracking and distribution visualization
          </Typography>
        </Paper>

        {/* Analytics Section */}
        <Typography variant="h4" sx={{ color: 'white', mb: 4 }}>
          Population Analytics
        </Typography>
        <Paper
          sx={{
            p: 3,
            height: '400px',
            background: 'rgba(17, 34, 64, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            '&:hover': {
              background: 'rgba(17, 34, 64, 0.9)',
            }
          }}
          onClick={() => navigate('/analytics')}
        >
          <TrendingUpIcon sx={{ fontSize: 60, color: '#00f2ff', mb: 2 }} />
          <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            View Detailed Analytics
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Click to explore population trends and conservation metrics
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Monitoring; 