import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Paper,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Add as AddIcon } from '@mui/icons-material';
import axios from 'axios';

const Species = () => {
  const [species, setSpecies] = useState([]);
  const [open, setOpen] = useState(false);
  const [newSpecies, setNewSpecies] = useState({
    name: '',
    scientificName: '',
    status: '',
    population: '',
    location: '',
    cryoRequirements: '',
  });

  useEffect(() => {
    fetchSpecies();
  }, []);

  const fetchSpecies = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/species');
      setSpecies(response.data);
    } catch (error) {
      console.error('Error fetching species:', error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/species', newSpecies);
      fetchSpecies();
      handleClose();
      setNewSpecies({
        name: '',
        scientificName: '',
        status: '',
        population: '',
        location: '',
        cryoRequirements: '',
      });
    } catch (error) {
      console.error('Error adding species:', error);
    }
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'scientificName', headerName: 'Scientific Name', width: 200 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'population', headerName: 'Population', width: 150 },
    { field: 'location', headerName: 'Location', width: 200 },
    { field: 'cryoRequirements', headerName: 'Cryo Requirements', width: 200 },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Endangered Species Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
          sx={{
            background: 'linear-gradient(135deg, #00f2ff, #0066ff)',
            '&:hover': {
              background: 'linear-gradient(135deg, #00e6f2, #0052cc)',
            },
          }}
        >
          Add Species
        </Button>
      </Box>

      <Paper sx={{ height: 600, background: 'rgba(255, 255, 255, 0.05)' }}>
        <DataGrid
          rows={species}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          sx={{
            border: 'none',
            '& .MuiDataGrid-cell': {
              borderColor: 'rgba(255, 255, 255, 0.1)',
            },
            '& .MuiDataGrid-columnHeaders': {
              borderColor: 'rgba(255, 255, 255, 0.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
            },
          }}
        />
      </Paper>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Add New Species</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                value={newSpecies.name}
                onChange={(e) => setNewSpecies({ ...newSpecies, name: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Scientific Name"
                value={newSpecies.scientificName}
                onChange={(e) => setNewSpecies({ ...newSpecies, scientificName: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Status"
                value={newSpecies.status}
                onChange={(e) => setNewSpecies({ ...newSpecies, status: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Population"
                value={newSpecies.population}
                onChange={(e) => setNewSpecies({ ...newSpecies, population: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                value={newSpecies.location}
                onChange={(e) => setNewSpecies({ ...newSpecies, location: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Cryo Requirements"
                value={newSpecies.cryoRequirements}
                onChange={(e) => setNewSpecies({ ...newSpecies, cryoRequirements: e.target.value })}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #00f2ff, #0066ff)',
              '&:hover': {
                background: 'linear-gradient(135deg, #00e6f2, #0052cc)',
              },
            }}
          >
            Add Species
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Species; 