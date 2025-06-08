import React, { useState, useEffect, useRef } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAuth } from '../contexts/AuthContext';
import DefaultAvatar from './DefaultAvatar';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const pages = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const authenticatedPages = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Map', path: '/map' },
  { name: 'Monitoring', path: '/monitoring' },
  { name: 'Emergency', path: '/emergency' },
  { name: 'Cryopreservation', path: '/cryopreservation' },
  { name: 'Analytics', path: '/analytics' },
];

const settings = [
  { name: 'Profile', path: '/profile' },
  { name: 'Settings', path: '/settings' },
  { name: 'Logout', action: 'logout' }
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navbarRef = useRef(null);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuItemClick = (path, action) => {
    if (action === 'logout') {
      logout();
    }
    handleCloseNavMenu();
    handleCloseUserMenu();
    setMobileOpen(false);
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleCloseNavMenu();
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (navbarRef.current) {
      gsap.fromTo(
        navbarRef.current,
        { y: -100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out'
        }
      );
    }
  }, []);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Sanrakshika
      </Typography>
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.18)' }} />
      <List sx={{ px: 1 }}>
        {pages.map((page) => (
          <ListItem
            button
            key={page.name}
            component={RouterLink} 
            to={page.path}
            selected={location.pathname === page.path}
            sx={{
              background: location.pathname === page.path 
                ? 'rgba(0, 242, 255, 0.15)'
                : 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              '&:hover': {
                background: 'rgba(0, 242, 255, 0.1)',
              },
              transition: 'all 0.3s ease',
              my: 0.5,
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <ListItemText 
              primary={page.name} 
              sx={{
                color: 'white',
                '& .MuiTypography-root': {
                  fontWeight: location.pathname === page.path ? 600 : 400
                }
              }}
            />
          </ListItem>
        ))}
        {currentUser && authenticatedPages.map((page) => (
          <ListItem
            button
            key={page.name}
            component={RouterLink} 
            to={page.path}
            selected={location.pathname === page.path}
            sx={{
              background: location.pathname === page.path 
                ? 'rgba(0, 242, 255, 0.15)'
                : 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              '&:hover': {
                background: 'rgba(0, 242, 255, 0.1)',
              },
              transition: 'all 0.3s ease',
              my: 0.5,
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <ListItemText 
              primary={page.name} 
              sx={{
                color: 'white',
                '& .MuiTypography-root': {
                  fontWeight: location.pathname === page.path ? 600 : 400
                }
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="fixed"
      ref={navbarRef}
      sx={{
        background: scrolled 
          ? 'rgba(10, 25, 47, 0.7)'
          : 'rgba(10, 25, 47, 0.4)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: scrolled 
          ? '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
          : 'none',
        borderBottom: scrolled 
          ? '1px solid rgba(255, 255, 255, 0.18)'
          : 'none',
        transition: 'all 0.3s ease',
        zIndex: 1200
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: { xs: '56px', sm: '64px' } }}>
          {/* Logo */}
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Audiowide',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'white',
              textDecoration: 'none',
              fontSize: { md: '1.1rem', lg: '1.2rem' },
              textShadow: '0 0 10px rgba(0, 242, 255, 0.5)',
              '&:hover': {
                color: '#00f2ff',
                textShadow: '0 0 15px rgba(0, 242, 255, 0.8)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            SANRAKSHIKA
          </Typography>

          {/* Mobile Logo */}
          <Typography
            variant="h5"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Audiowide',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'white',
              textDecoration: 'none',
              fontSize: '1rem',
              textShadow: '0 0 10px rgba(0, 242, 255, 0.5)',
              '&:hover': {
                color: '#00f2ff',
                textShadow: '0 0 15px rgba(0, 242, 255, 0.8)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            SANRAKSHIKA
          </Typography>

          {/* Mobile Menu Button */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleDrawerToggle}
              color="inherit"
              sx={{
                color: 'white',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 0.2 }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={RouterLink}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{
                  color: 'white',
                  display: 'block',
                  px: 1,
                  py: 0.6,
                  borderRadius: '8px',
                  background: location.pathname === page.path 
                    ? 'rgba(0, 242, 255, 0.15)'
                    : 'transparent',
                  '&:hover': {
                    background: 'rgba(0, 242, 255, 0.1)',
                  },
                  transition: 'all 0.3s ease',
                  fontSize: { md: '0.8rem', lg: '0.85rem' },
                  ...(page.name === 'Home' && {
                    ml: 2,
                    minWidth: '60px',
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  })
                }}
              >
                {page.name}
              </Button>
            ))}
            {currentUser && authenticatedPages.map((page) => (
              <Button
                key={page.name}
                component={RouterLink}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{
                  color: 'white',
                  display: 'block',
                  px: page.name === 'Map' ? 0.3 : 1,
                  py: 0.6,
                  borderRadius: '8px',
                  background: location.pathname === page.path 
                    ? 'rgba(0, 242, 255, 0.15)'
                    : 'transparent',
                  '&:hover': {
                    background: 'rgba(0, 242, 255, 0.1)',
                  },
                  transition: 'all 0.3s ease',
                  fontSize: { md: '0.8rem', lg: '0.85rem' },
                  ...(page.name === 'Map' && {
                    minWidth: '50px',
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  })
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* User Menu */}
          <Box sx={{ flexGrow: 0, ml: 0.5 }}>
            {currentUser ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={currentUser.displayName || 'User'}
                      src={currentUser.photoURL}
                      sx={{
                        width: { xs: 32, sm: 36 },
                        height: { xs: 32, sm: 36 },
                        border: '2px solid rgba(0, 242, 255, 0.5)'
                      }}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  PaperProps={{
                    sx: {
                      background: 'rgba(17, 34, 64, 0.95)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      mt: 1.5
                    }
                  }}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting.name}
                      onClick={() => handleMenuItemClick(setting.path, setting.action)}
                      sx={{
                        color: 'white',
                        '&:hover': {
                          background: 'rgba(0, 242, 255, 0.1)',
                        },
                        fontSize: '0.85rem',
                        py: 0.6
                      }}
                    >
                      <Typography textAlign="center">{setting.name}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex', gap: 2, ml: 2 }}>
                <Button
                  component={RouterLink}
                  to="/login"
                  variant="outlined"
                  sx={{
                    color: 'white',
                    borderColor: 'rgba(0, 242, 255, 0.5)',
                    '&:hover': {
                      borderColor: '#00f2ff',
                      background: 'rgba(0, 242, 255, 0.1)',
                    },
                    fontSize: { md: '0.8rem', lg: '0.85rem' },
                    py: 0.6,
                    px: 1.5
                  }}
                >
                  Login
                </Button>
                <Button
                  component={RouterLink}
                  to="/signup"
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(45deg, #00f2ff 30%, #00b8ff 90%)',
                    color: 'white',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #00e6ff 30%, #00a8ff 90%)',
                    },
                    fontSize: { md: '0.8rem', lg: '0.85rem' },
                    color: 'black',
                    py: 0.6,
                    px: 1.5
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: { xs: '100%', sm: 280 },
            background: 'rgba(17, 34, 64, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)'
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar; 