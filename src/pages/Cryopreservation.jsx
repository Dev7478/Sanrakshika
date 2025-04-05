import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material';
import ScienceIcon from '@mui/icons-material/Science';
import StorageIcon from '@mui/icons-material/Storage';
import TimelineIcon from '@mui/icons-material/Timeline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';

// Mock data for cryo labs
const cryoLabs = [
  {
    id: 1,
    name: 'Bengal Tiger Cryo Lab',
    location: 'Kaziranga National Park',
    status: 'Active',
    specimens: 156,
    successRate: 92,
    lastUpdated: '2024-03-15',
    image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 2,
    name: 'Snow Leopard Preservation Center',
    location: 'Himalayan Region',
    status: 'Active',
    specimens: 89,
    successRate: 88,
    lastUpdated: '2024-03-14',
    image: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 3,
    name: 'Marine Species Bank',
    location: 'Andaman Islands',
    status: 'Maintenance',
    specimens: 234,
    successRate: 85,
    lastUpdated: '2024-03-13',
    image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  }
];

const Cryopreservation = () => {
  return (
    <Box sx={{ 
      minHeight: '100vh', 
      pt: 10, 
      pb: 6, 
      background: 'linear-gradient(135deg, #0a192f 0%, #112240 100%)',
      color: 'white'
    }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography 
            variant="h2" 
            sx={{ 
              mb: 2,
              background: 'linear-gradient(135deg, #00f2ff, #0066ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Cryopreservation Labs
          </Typography>
          <Typography variant="h5" sx={{ color: 'rgba(255, 255, 255, 0.9)', maxWidth: '800px', mx: 'auto' }}>
            Advanced facilities preserving genetic material of endangered species for future conservation efforts
          </Typography>
        </Box>

        {/* Stats Overview */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                background: 'rgba(17, 34, 64, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <StorageIcon sx={{ color: '#00f2ff', mr: 1 }} />
                <Typography variant="h6" sx={{ color: 'white' }}>
                  Total Specimens
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ color: '#00f2ff' }}>
                479
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Across all facilities
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                background: 'rgba(17, 34, 64, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ScienceIcon sx={{ color: '#00f2ff', mr: 1 }} />
                <Typography variant="h6" sx={{ color: 'white' }}>
                  Success Rate
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ color: '#00f2ff' }}>
                88.3%
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Average preservation success
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                background: 'rgba(17, 34, 64, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TimelineIcon sx={{ color: '#00f2ff', mr: 1 }} />
                <Typography variant="h6" sx={{ color: 'white' }}>
                  Active Projects
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ color: '#00f2ff' }}>
                12
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Ongoing preservation initiatives
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Lab Cards */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {cryoLabs.map((lab) => (
            <Grid item xs={12} md={4} key={lab.id}>
              <Card sx={{ 
                height: '100%',
                background: 'rgba(17, 34, 64, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={lab.image}
                  alt={lab.name}
                />
                <CardContent>
                  <Typography variant="h5" sx={{ color: 'white', mb: 1 }}>
                    {lab.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}>
                    {lab.location}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Chip
                      icon={lab.status === 'Active' ? <CheckCircleIcon /> : <WarningIcon />}
                      label={lab.status}
                      color={lab.status === 'Active' ? 'success' : 'warning'}
                      size="small"
                    />
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
                      Success Rate
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={lab.successRate} 
                      sx={{ 
                        height: 8, 
                        borderRadius: 4,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        '& .MuiLinearProgress-bar': {
                          background: 'linear-gradient(90deg, #00f2ff, #0066ff)',
                        }
                      }}
                    />
                  </Box>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Specimens: {lab.specimens}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Last Updated: {lab.lastUpdated}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Detailed Stats Table */}
        <Paper sx={{ 
          p: 3,
          background: 'rgba(17, 34, 64, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}>
          <Typography variant="h5" sx={{ color: 'white', mb: 3 }}>
            Detailed Statistics
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Lab Name</TableCell>
                  <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Specimens</TableCell>
                  <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Success Rate</TableCell>
                  <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cryoLabs.map((lab) => (
                  <TableRow key={lab.id}>
                    <TableCell sx={{ color: 'white' }}>{lab.name}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{lab.specimens}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{lab.successRate}%</TableCell>
                    <TableCell>
                      <Chip
                        icon={lab.status === 'Active' ? <CheckCircleIcon /> : <WarningIcon />}
                        label={lab.status}
                        color={lab.status === 'Active' ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </Box>
  );
};

export default Cryopreservation; 