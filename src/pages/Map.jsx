import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Alert, Button, ButtonGroup, Paper } from '@mui/material';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';

// Fix for default marker icons in Leaflet with Vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Sample data for species
const speciesData = [
  // Big Cats
  {
    id: 1,
    name: 'Bengal Tiger',
    location: [23.5937, 85.2789], // Jharkhand
    status: 'Endangered',
    population: 2900,
    lastUpdated: '2023-05-15',
    category: 'Big Cats'
  },
  {
    id: 2,
    name: 'Sundarbans Royal Bengal Tiger',
    location: [21.9497, 89.1833], // Sundarbans
    status: 'Endangered',
    population: 96,
    lastUpdated: '2023-05-14',
    category: 'Big Cats'
  },
  {
    id: 3,
    name: 'Indian Leopard',
    location: [20.5937, 78.9629], // Central India
    status: 'Vulnerable',
    population: 12000,
    lastUpdated: '2023-05-14',
    category: 'Big Cats'
  },
  {
    id: 4,
    name: 'Snow Leopard',
    location: [34.0837, 77.5709], // Ladakh
    status: 'Vulnerable',
    population: 3500,
    lastUpdated: '2023-05-13',
    category: 'Big Cats'
  },
  {
    id: 5,
    name: 'Asiatic Lion',
    location: [21.5433, 70.4401], // Gir Forest
    status: 'Endangered',
    population: 674,
    lastUpdated: '2023-05-12',
    category: 'Big Cats'
  },

  // Elephants
  {
    id: 6,
    name: 'Indian Elephant',
    location: [11.1271, 78.6569], // Tamil Nadu
    status: 'Endangered',
    population: 24500,
    lastUpdated: '2023-05-14',
    category: 'Elephants'
  },
  {
    id: 7,
    name: 'Asian Elephant',
    location: [12.9716, 77.5946], // Karnataka
    status: 'Endangered',
    population: 28000,
    lastUpdated: '2023-05-13',
    category: 'Elephants'
  },

  // Rhinos
  {
    id: 8,
    name: 'Indian Rhinoceros',
    location: [26.7041, 92.8695], // Kaziranga
    status: 'Vulnerable',
    population: 3600,
    lastUpdated: '2023-05-12',
    category: 'Rhinos'
  },
  {
    id: 9,
    name: 'Greater One-Horned Rhino',
    location: [27.0238, 93.4355], // Manas
    status: 'Vulnerable',
    population: 3800,
    lastUpdated: '2023-05-11',
    category: 'Rhinos'
  },

  // Bears
  {
    id: 10,
    name: 'Sloth Bear',
    location: [15.3173, 75.7139], // Karnataka
    status: 'Vulnerable',
    population: 20000,
    lastUpdated: '2023-05-10',
    category: 'Bears'
  },
  {
    id: 11,
    name: 'Himalayan Brown Bear',
    location: [34.0837, 77.5709], // Ladakh
    status: 'Vulnerable',
    population: 500,
    lastUpdated: '2023-05-09',
    category: 'Bears'
  },

  // Primates
  {
    id: 12,
    name: 'Lion-tailed Macaque',
    location: [10.5276, 76.2144], // Kerala
    status: 'Endangered',
    population: 4000,
    lastUpdated: '2023-05-08',
    category: 'Primates'
  },
  {
    id: 13,
    name: 'Golden Langur',
    location: [26.7041, 92.8695], // Assam
    status: 'Endangered',
    population: 6000,
    lastUpdated: '2023-05-07',
    category: 'Primates'
  },

  // Birds
  {
    id: 14,
    name: 'Great Indian Bustard',
    location: [26.2389, 73.0243], // Rajasthan
    status: 'Critically Endangered',
    population: 150,
    lastUpdated: '2023-05-06',
    category: 'Birds'
  },
  {
    id: 15,
    name: 'Indian Vulture',
    location: [28.6139, 77.2090], // Delhi
    status: 'Critically Endangered',
    population: 10000,
    lastUpdated: '2023-05-05',
    category: 'Birds'
  },

  // Reptiles
  {
    id: 16,
    name: 'Gharial',
    location: [25.3176, 82.9739], // Uttar Pradesh
    status: 'Critically Endangered',
    population: 650,
    lastUpdated: '2023-05-04',
    category: 'Reptiles'
  },
  {
    id: 17,
    name: 'King Cobra',
    location: [8.5276, 76.9366], // Kerala
    status: 'Vulnerable',
    population: 10000,
    lastUpdated: '2023-05-03',
    category: 'Reptiles'
  },

  // New Additions
  {
    id: 18,
    name: 'Jalpaiguri Bison',
    location: [26.5167, 88.7333], // Jalpaiguri
    status: 'Vulnerable',
    population: 3000,
    lastUpdated: '2023-05-02',
    category: 'Wild Cattle'
  },
  {
    id: 19,
    name: 'Hoolock Gibbon',
    location: [26.7041, 92.8695], // Assam
    status: 'Endangered',
    population: 2000,
    lastUpdated: '2023-05-01',
    category: 'Primates'
  },
  {
    id: 20,
    name: 'Red Panda',
    location: [27.3333, 88.6167], // Sikkim
    status: 'Endangered',
    population: 2500,
    lastUpdated: '2023-04-30',
    category: 'Mammals'
  },
  {
    id: 21,
    name: 'Himalayan Tahr',
    location: [30.7333, 79.0667], // Uttarakhand
    status: 'Near Threatened',
    population: 5000,
    lastUpdated: '2023-04-29',
    category: 'Wild Goats'
  },
  {
    id: 22,
    name: 'Nilgiri Tahr',
    location: [11.3667, 76.8000], // Tamil Nadu
    status: 'Endangered',
    population: 3000,
    lastUpdated: '2023-04-28',
    category: 'Wild Goats'
  },
  {
    id: 23,
    name: 'Sangai Deer',
    location: [24.5000, 93.7833], // Manipur
    status: 'Endangered',
    population: 260,
    lastUpdated: '2023-04-27',
    category: 'Deer'
  },
  {
    id: 24,
    name: 'Hangul Deer',
    location: [34.0837, 74.7973], // Kashmir
    status: 'Critically Endangered',
    population: 150,
    lastUpdated: '2023-04-26',
    category: 'Deer'
  },
  {
    id: 25,
    name: 'Indian Wild Ass',
    location: [23.8333, 71.2000], // Gujarat
    status: 'Near Threatened',
    population: 5000,
    lastUpdated: '2023-04-25',
    category: 'Wild Equids'
  },
  {
    id: 26,
    name: 'Swamp Deer',
    location: [26.7041, 92.8695], // Kaziranga
    status: 'Vulnerable',
    population: 4000,
    lastUpdated: '2023-04-24',
    category: 'Deer'
  },
  {
    id: 27,
    name: 'Clouded Leopard',
    location: [25.6667, 91.8833], // Meghalaya
    status: 'Vulnerable',
    population: 10000,
    lastUpdated: '2023-04-23',
    category: 'Big Cats'
  },
  {
    id: 28,
    name: 'Marbled Cat',
    location: [25.6667, 91.8833], // Meghalaya
    status: 'Near Threatened',
    population: 10000,
    lastUpdated: '2023-04-22',
    category: 'Wild Cats'
  }
];

const Map = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  // Get unique conservation statuses
  const statuses = ['All', 'Critically Endangered', 'Endangered', 'Vulnerable', 'Near Threatened', 'Least Concern'];

  // Filter species based on selected status
  const filteredSpecies = selectedStatus === 'All' 
    ? speciesData 
    : speciesData.filter(species => species.status === selectedStatus);

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Critically Endangered':
        return '#ff0000';
      case 'Endangered':
        return '#ff5252';
      case 'Vulnerable':
        return '#ff9800';
      case 'Near Threatened':
        return '#ffeb3b';
      case 'Least Concern':
        return '#4caf50';
      default:
        return '#9e9e9e';
    }
  };

  useEffect(() => {
    if (!map) {
      try {
        const mapInstance = L.map('map').setView([20.5937, 78.9629], 5);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapInstance);

        setMap(mapInstance);
        setLoading(false);
      } catch (err) {
        console.error('Map initialization error:', err);
        setError('Failed to initialize map. Please try refreshing the page.');
        setLoading(false);
      }
    }

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [map]);

  useEffect(() => {
    if (!map) return;

    // Clear existing markers
    markers.forEach(marker => marker.remove());
    const newMarkers = [];

    // Add new markers for filtered species
    filteredSpecies.forEach(species => {
      const marker = L.marker(species.location)
        .addTo(map)
        .bindPopup(`
          <div style="font-family: Arial, sans-serif; padding: 8px;">
            <h3 style="color: #000000; margin: 0 0 8px 0; font-size: 16px; font-weight: bold;">${species.name}</h3>
            <p style="color: #666666; margin: 4px 0; font-size: 14px;"><strong>Category:</strong> ${species.category}</p>
            <p style="color: ${getStatusColor(species.status)}; margin: 4px 0; font-size: 14px; font-weight: bold;"><strong>Status:</strong> ${species.status}</p>
            <p style="color: #666666; margin: 4px 0; font-size: 14px;"><strong>Population:</strong> ${species.population.toLocaleString()}</p>
            <p style="color: #666666; margin: 4px 0; font-size: 14px;"><strong>Last Updated:</strong> ${species.lastUpdated}</p>
          </div>
        `);
      newMarkers.push(marker);
    });

    setMarkers(newMarkers);

    // Fit map bounds to show all markers
    if (newMarkers.length > 0) {
      const group = new L.featureGroup(newMarkers);
      map.fitBounds(group.getBounds().pad(0.1));
    }
  }, [map, selectedStatus]);

  const handleStatusClick = (status) => {
    setSelectedStatus(status);
  };

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
    <Box sx={{ height: '100vh', width: '100%', position: 'relative' }}>
      {loading && (
        <Box sx={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          zIndex: 1000
        }}>
          <CircularProgress sx={{ color: '#00f2ff' }} />
        </Box>
      )}
      
      <div id="map" style={{ height: '100%', width: '100%' }} />

      {/* Conservation Status Filter Buttons */}
      <Paper 
        elevation={3} 
      sx={{
          position: 'absolute', 
          bottom: 20, 
          left: '50%', 
          transform: 'translateX(-50%)',
          padding: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: 2,
          zIndex: 1000
        }}
      >
        <ButtonGroup 
          variant="contained" 
          aria-label="conservation status filter buttons"
              sx={{
            '& .MuiButton-root': {
              color: '#000',
              '&:hover': {
                opacity: 0.8
              }
            }
          }}
        >
          {statuses.map((status) => (
            <Button
              key={status}
              onClick={() => handleStatusClick(status)}
              sx={{
                backgroundColor: status === 'All' 
                  ? '#00f2ff' 
                  : getStatusColor(status),
                '&:hover': {
                  backgroundColor: status === 'All' 
                    ? '#00d6e6' 
                    : getStatusColor(status),
                  opacity: 0.8
                }
              }}
            >
              {status}
            </Button>
          ))}
        </ButtonGroup>
              </Paper>
    </Box>
  );
};

export default Map; 