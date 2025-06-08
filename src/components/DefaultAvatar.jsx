import React from 'react';
import { Avatar } from '@mui/material';

const DefaultAvatar = ({ email, size = 32 }) => {
  // Generate initials from email
  const getInitials = (email) => {
    if (!email) return '?';
    const parts = email.split('@')[0];
    return parts.charAt(0).toUpperCase();
  };

  // Generate a consistent color based on email
  const getColor = (email) => {
    if (!email) return '#1976d2';
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      hash = email.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 50%)`;
  };

  return (
    <Avatar
      alt={email}
      sx={{
        width: size,
        height: size,
        bgcolor: getColor(email),
        fontSize: `${size * 0.4}px`,
        fontWeight: 'bold',
        '&:hover': {
          transform: 'scale(1.1)',
          transition: 'transform 0.2s ease-in-out'
        }
      }}
    >
      {getInitials(email)}
    </Avatar>
  );
};

export default DefaultAvatar; 