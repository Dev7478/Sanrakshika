import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AlertProvider } from './contexts/AlertContext';
import { SearchProvider } from './contexts/SearchContext';
import App from './App.jsx';
import './index.css';
import './firebase'; // Import Firebase first
import { CircularProgress, Box } from '@mui/material';

// Loading fallback component
const LoadingFallback = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      bgcolor: 'background.default'
    }}
  >
    <CircularProgress />
  </Box>
);

// Add error logging with better error handling
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  // Prevent the error from bubbling up
  event.preventDefault();
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // Prevent the rejection from bubbling up
  event.preventDefault();
});

// Create root element
let root = null;

// Initialize the app
const initializeApp = async () => {
  try {
    const container = document.getElementById('root');
    
    // Check if root already exists
    if (!root) {
      root = ReactDOM.createRoot(container);
    }

    // Render the app
    root.render(
      <BrowserRouter>
        <AlertProvider>
          <AuthProvider>
            <SearchProvider>
              <Suspense fallback={<LoadingFallback />}>
                <App />
              </Suspense>
            </SearchProvider>
          </AuthProvider>
        </AlertProvider>
      </BrowserRouter>
    );
  } catch (error) {
    console.error('Failed to initialize app:', error);
    // Show error UI
    const container = document.getElementById('root');
    if (container) {
      container.innerHTML = `
        <div style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 20px;
          text-align: center;
          background-color: #f5f5f5;
        ">
          <h1>Failed to initialize application</h1>
          <p>Please try refreshing the page</p>
          <button
            onclick="window.location.reload()"
            style="
              padding: 10px 20px;
              margin-top: 20px;
              cursor: pointer;
              background-color: #1976d2;
              color: white;
              border: none;
              border-radius: 4px;
            "
          >
            Refresh Page
          </button>
        </div>
      `;
    }
  }
};

// Start the app
initializeApp();