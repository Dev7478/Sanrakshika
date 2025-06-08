import React from 'react';
import { Box, Container, Typography, Paper, Grid, Card, CardContent, CardHeader, IconButton, Chip, Divider } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import RefreshIcon from '@mui/icons-material/Refresh';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

// Sample data for population trends
const populationTrendsData = [
  { year: '2018', 'Bengal Tiger': 2500, 'Indian Elephant': 27000, 'Snow Leopard': 4000 },
  { year: '2019', 'Bengal Tiger': 2600, 'Indian Elephant': 26500, 'Snow Leopard': 3900 },
  { year: '2020', 'Bengal Tiger': 2550, 'Indian Elephant': 26000, 'Snow Leopard': 3800 },
  { year: '2021', 'Bengal Tiger': 2700, 'Indian Elephant': 25500, 'Snow Leopard': 3700 },
  { year: '2022', 'Bengal Tiger': 2800, 'Indian Elephant': 25000, 'Snow Leopard': 3600 },
  { year: '2023', 'Bengal Tiger': 2900, 'Indian Elephant': 24500, 'Snow Leopard': 3500 },
];

// Sample data for conservation status
const conservationStatusData = [
  { name: 'Endangered', value: 42, color: '#ff5252' },
  { name: 'Vulnerable', value: 35, color: '#ff9800' },
  { name: 'Near Threatened', value: 28, color: '#ffeb3b' },
  { name: 'Least Concern', value: 51, color: '#4caf50' },
];

// Sample data for habitat distribution
const habitatDistributionData = [
  { name: 'Forest', value: 45, color: '#00f2ff' },
  { name: 'Grassland', value: 25, color: '#0066ff' },
  { name: 'Wetland', value: 15, color: '#ff5252' },
  { name: 'Mountain', value: 15, color: '#ff9800' },
];

// Sample data for recent alerts
const recentAlertsData = [
  { date: '2023-05-15', type: 'Poaching', location: 'Kaziranga National Park', severity: 'High' },
  { date: '2023-05-14', type: 'Habitat Loss', location: 'Sundarbans', severity: 'Medium' },
  { date: '2023-05-13', type: 'Human Conflict', location: 'Jim Corbett', severity: 'High' },
  { date: '2023-05-12', type: 'Disease Outbreak', location: 'Bandipur', severity: 'Low' },
  { date: '2023-05-11', type: 'Illegal Logging', location: 'Periyar', severity: 'Medium' },
];

const Dashboard = () => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High':
        return '#ff5252';
      case 'Medium':
        return '#ff9800';
      case 'Low':
        return '#4caf50';
      default:
        return '#9e9e9e';
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        pt: 10,
        pb: 6,
        background: 'linear-gradient(135deg, #0a192f 0%, #112240 100%)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography
              variant="h2"
              sx={{
                textAlign: 'center',
                mb: 4,
                fontWeight: 700,
                background: 'linear-gradient(135deg, #00f2ff, #0066ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Dashboard
            </Typography>
          </Grid>

          {/* Stats Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                background: 'rgba(17, 34, 64, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                height: '100%',
              }}
            >
              <CardHeader
                title="Total Species"
                action={
                  <IconButton aria-label="refresh">
                    <RefreshIcon sx={{ color: '#00f2ff' }} />
                  </IconButton>
                }
                titleTypographyProps={{ color: '#ffffff' }}
              />
              <CardContent>
                <Typography variant="h3" sx={{ color: '#00f2ff', mb: 1 }}>
                  156
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUpIcon sx={{ color: '#4caf50', mr: 1 }} />
                  <Typography variant="body2" sx={{ color: '#8892b0' }}>
                    +12% from last month
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                background: 'rgba(17, 34, 64, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                height: '100%',
              }}
            >
              <CardHeader
                title="Endangered"
                action={
                  <IconButton aria-label="refresh">
                    <RefreshIcon sx={{ color: '#00f2ff' }} />
                  </IconButton>
                }
                titleTypographyProps={{ color: '#ffffff' }}
              />
              <CardContent>
                <Typography variant="h3" sx={{ color: '#f44336', mb: 1 }}>
                  42
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <WarningIcon sx={{ color: '#f44336', mr: 1 }} />
                  <Typography variant="body2" sx={{ color: '#8892b0' }}>
                    Critical conservation needed
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                background: 'rgba(17, 34, 64, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                height: '100%',
              }}
            >
              <CardHeader
                title="Protected"
                action={
                  <IconButton aria-label="refresh">
                    <RefreshIcon sx={{ color: '#00f2ff' }} />
                  </IconButton>
                }
                titleTypographyProps={{ color: '#ffffff' }}
              />
              <CardContent>
                <Typography variant="h3" sx={{ color: '#4caf50', mb: 1 }}>
                  89
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CheckCircleIcon sx={{ color: '#4caf50', mr: 1 }} />
                  <Typography variant="body2" sx={{ color: '#8892b0' }}>
                    Stable population
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                background: 'rgba(17, 34, 64, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                height: '100%',
              }}
            >
              <CardHeader
                title="Alerts"
                action={
                  <IconButton aria-label="refresh">
                    <RefreshIcon sx={{ color: '#00f2ff' }} />
                  </IconButton>
                }
                titleTypographyProps={{ color: '#ffffff' }}
              />
              <CardContent>
                <Typography variant="h3" sx={{ color: '#ff9800', mb: 1 }}>
                  5
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ErrorIcon sx={{ color: '#ff9800', mr: 1 }} />
                  <Typography variant="body2" sx={{ color: '#8892b0' }}>
                    Requires attention
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts and Alerts Section */}
          <Grid item xs={12} md={8}>
            <Paper
              sx={{
                p: 3,
                background: 'rgba(17, 34, 64, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                height: '100%',
              }}
            >
              <Typography variant="h6" sx={{ color: '#00f2ff', mb: 3 }}>
                Population Trends
              </Typography>
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={populationTrendsData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a3f54" />
                    <XAxis dataKey="year" stroke="#8892b0" />
                    <YAxis stroke="#8892b0" />
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(17, 34, 64, 0.95)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '4px',
                        color: '#fff',
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="Bengal Tiger"
                      stroke="#00f2ff"
                      strokeWidth={2}
                      dot={{ fill: '#00f2ff' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="Indian Elephant"
                      stroke="#0066ff"
                      strokeWidth={2}
                      dot={{ fill: '#0066ff' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="Snow Leopard"
                      stroke="#ff5252"
                      strokeWidth={2}
                      dot={{ fill: '#ff5252' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>

              <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ color: '#00f2ff', mb: 2 }}>
                    Conservation Status
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={conservationStatusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {conservationStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            background: 'rgba(17, 34, 64, 0.95)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '4px',
                            color: '#fff',
                          }}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ color: '#00f2ff', mb: 2 }}>
                    Habitat Distribution
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={habitatDistributionData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2a3f54" />
                        <XAxis dataKey="name" stroke="#8892b0" />
                        <YAxis stroke="#8892b0" />
                        <Tooltip
                          contentStyle={{
                            background: 'rgba(17, 34, 64, 0.95)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '4px',
                            color: '#fff',
                          }}
                        />
                        {habitatDistributionData.map((entry, index) => (
                          <Bar key={`bar-${index}`} dataKey="value" fill={entry.color} />
                        ))}
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                background: 'rgba(17, 34, 64, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                height: '100%',
              }}
            >
              <Typography variant="h6" sx={{ color: '#00f2ff', mb: 3 }}>
                Recent Alerts
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {recentAlertsData.map((alert, index) => (
                  <Card
                    key={index}
                    sx={{
                      background: 'rgba(17, 34, 64, 0.5)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 'bold' }}>
                          {alert.type}
                        </Typography>
                        <Chip
                          label={alert.severity}
                          size="small"
                          sx={{
                            backgroundColor: getSeverityColor(alert.severity),
                            color: 'white',
                            fontWeight: 'bold',
                          }}
                        />
                      </Box>
                      <Typography variant="body2" sx={{ color: '#8892b0', mb: 1 }}>
                        {alert.location}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#8892b0' }}>
                        {new Date(alert.date).toLocaleDateString()}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard; 