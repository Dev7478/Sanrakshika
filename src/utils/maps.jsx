// Calculate distance between two points in kilometers
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Convert degrees to radians
const toRad = (degrees) => {
  return degrees * (Math.PI/180);
};

// Get address from coordinates using Google Maps Geocoding API
export const getAddressFromCoordinates = async (lat, lng) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();
    
    if (data.status === 'OK') {
      return data.results[0].formatted_address;
    }
    throw new Error('Geocoding failed');
  } catch (error) {
    console.error('Error getting address:', error);
    return null;
  }
};

// Get coordinates from address using Google Maps Geocoding API
export const getCoordinatesFromAddress = async (address) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();
    
    if (data.status === 'OK') {
      const location = data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng
      };
    }
    throw new Error('Geocoding failed');
  } catch (error) {
    console.error('Error getting coordinates:', error);
    return null;
  }
};

// Check if a point is within a polygon
export const isPointInPolygon = (point, polygon) => {
  const x = point.lat;
  const y = point.lng;
  let inside = false;
  
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].lat;
    const yi = polygon[i].lng;
    const xj = polygon[j].lat;
    const yj = polygon[j].lng;
    
    const intersect = ((yi > y) !== (yj > y))
        && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  
  return inside;
};

// Calculate the center point of multiple coordinates
export const calculateCenter = (coordinates) => {
  if (!coordinates.length) return null;
  
  const lat = coordinates.reduce((sum, coord) => sum + coord.lat, 0) / coordinates.length;
  const lng = coordinates.reduce((sum, coord) => sum + coord.lng, 0) / coordinates.length;
  
  return { lat, lng };
};

// Calculate the bounding box of multiple coordinates
export const calculateBoundingBox = (coordinates) => {
  if (!coordinates.length) return null;
  
  const lats = coordinates.map(coord => coord.lat);
  const lngs = coordinates.map(coord => coord.lng);
  
  return {
    north: Math.max(...lats),
    south: Math.min(...lats),
    east: Math.max(...lngs),
    west: Math.min(...lngs)
  };
};

// Format coordinates for display
export const formatCoordinates = (lat, lng) => {
  return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
};

// Generate a Google Maps URL
export const getGoogleMapsUrl = (lat, lng, zoom = 15) => {
  return `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}`;
};

// Generate a Google Maps embed URL
export const getGoogleMapsEmbedUrl = (lat, lng, zoom = 15) => {
  return `https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=${lat},${lng}&zoom=${zoom}`;
};

// Generate a static map image URL
export const getStaticMapUrl = (lat, lng, zoom = 15, size = '600x300') => {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=${size}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
};

// Generate directions URL
export const getDirectionsUrl = (origin, destination) => {
  return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`;
}; 