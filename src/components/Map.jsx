import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Box, Paper, Typography, Chip, Grid } from '@mui/material';
import { gsap } from 'gsap';

// Sample data - replace with actual data from your backend
const speciesData = [
  {
    id: 1,
    name: 'Bengal Tiger',
    location: { lat: 20.5937, lng: 78.9629 },
    status: 'Endangered',
    population: 2500,
    lastUpdated: '2023-05-15',
    image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 2,
    name: 'Indian Elephant',
    location: { lat: 21.7679, lng: 78.8718 },
    status: 'Vulnerable',
    population: 27000,
    lastUpdated: '2023-05-10',
    image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 3,
    name: 'Snow Leopard',
    location: { lat: 34.0479, lng: 77.5761 },
    status: 'Vulnerable',
    population: 4000,
    lastUpdated: '2023-05-05',
    image: 'https://images.unsplash.com/photo-1607931058602-855c8c1b5c9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 4,
    name: 'Red Panda',
    location: { lat: 27.7172, lng: 85.3240 },
    status: 'Endangered',
    population: 10000,
    lastUpdated: '2023-05-01',
    image: 'https://images.unsplash.com/photo-1579165466741-7f35e9f1c0c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 5,
    name: 'Asiatic Lion',
    location: { lat: 21.7679, lng: 70.6872 },
    status: 'Endangered',
    population: 674,
    lastUpdated: '2023-04-28',
    image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  }
];

const Map = () => {
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [mapRef, setMapRef] = useState(null);
  const [bounds, setBounds] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const mapContainerStyle = {
    width: '100%',
    height: '600px',
    borderRadius: '8px',
  };

  const center = {
    lat: 23.5937,
    lng: 78.9629,
  };

  const options = {
    disableDefaultUI: true,
    zoomControl: true,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: true,
    styles: [
      {
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#ffffff' }],
      },
      {
        featureType: 'all',
        elementType: 'labels.text.stroke',
        stylers: [{ visibility: 'on' }, { color: '#000000' }, { lightness: 16 }],
      },
      {
        featureType: 'all',
        elementType: 'labels.icon',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'administrative',
        elementType: 'geometry.fill',
        stylers: [{ color: '#000000' }, { lightness: 20 }],
      },
      {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#000000' }, { lightness: 17 }, { weight: 1.2 }],
      },
      {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [{ color: '#0a192f' }, { lightness: 20 }],
      },
      {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{ color: '#0a192f' }, { lightness: 21 }],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [{ color: '#000000' }, { lightness: 17 }],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#000000' }, { lightness: 29 }, { weight: 0.2 }],
      },
      {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [{ color: '#000000' }, { lightness: 18 }],
      },
      {
        featureType: 'road.local',
        elementType: 'geometry',
        stylers: [{ color: '#000000' }, { lightness: 16 }],
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{ color: '#000000' }, { lightness: 19 }],
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#0066ff' }, { lightness: 17 }],
      },
    ],
  };

  const onLoad = (map) => {
    setMapRef(map);
    setMapLoaded(true);
    
    // Calculate bounds to fit all markers
    const bounds = new window.google.maps.LatLngBounds();
    speciesData.forEach(species => {
      bounds.extend(species.location);
    });
    map.fitBounds(bounds);
    setBounds(bounds);
  };

  const onUnmount = () => {
    setMapRef(null);
  };

  useEffect(() => {
    if (mapLoaded && selectedSpecies) {
      gsap.to(mapRef, {
        duration: 1,
        zoom: 8,
        center: selectedSpecies.location,
        ease: 'power2.inOut',
      });
    }
  }, [selectedSpecies, mapLoaded, mapRef]);

  const getStatusColor = (status) => {
    switch (status) {
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

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={5}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={options}
        >
          {speciesData.map((species) => (
            <Marker
              key={species.id}
              position={species.location}
              onClick={() => setSelectedSpecies(species)}
              icon={{
                url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                scaledSize: new window.google.maps.Size(40, 40),
              }}
            />
          ))}

          {selectedSpecies && (
            <InfoWindow
              position={selectedSpecies.location}
              onCloseClick={() => setSelectedSpecies(null)}
            >
              <Box sx={{ width: 250, p: 1 }}>
                <img
                  src={selectedSpecies.image}
                  alt={selectedSpecies.name}
                  style={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: '4px' }}
                />
                <Typography variant="h6" sx={{ mt: 1, fontWeight: 'bold' }}>
                  {selectedSpecies.name}
                </Typography>
                <Chip
                  label={selectedSpecies.status}
                  size="small"
                  sx={{
                    backgroundColor: getStatusColor(selectedSpecies.status),
                    color: 'white',
                    fontWeight: 'bold',
                    mt: 1,
                  }}
                />
                <Grid container spacing={1} sx={{ mt: 1 }}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Population:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      {selectedSpecies.population.toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Last Updated:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      {new Date(selectedSpecies.lastUpdated).toLocaleDateString()}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </Box>
  );
};

export default Map; 