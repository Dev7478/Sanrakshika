import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from '@mui/material';

const DatabaseConnection = () => {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [streamlitUrl, setStreamlitUrl] = useState('');

  useEffect(() => {
    fetchTables();
    // This would be your Streamlit server URL
    setStreamlitUrl('http://localhost:8501');
  }, []);

  const fetchTables = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/tables/');
      setTables(response.data.tables);
    } catch (error) {
      console.error('Error fetching tables:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTableData = async (tableName) => {
    try {
      setLoading(true);
      setSelectedTable(tableName);
      const response = await axios.get(`http://localhost:8000/table/${tableName}`);
      setTableData(response.data);
    } catch (error) {
      console.error('Error fetching table data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDataImported = () => {
    fetchTables(); // Refresh tables after import
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Database Connection
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 4, mt: 4 }}>
        {/* Database Tables Panel */}
        <Paper sx={{ p: 3, flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            PostgreSQL Tables
          </Typography>
          
          {loading && tables.length === 0 ? (
            <CircularProgress />
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {tables.map((table) => (
                <Button
                  key={table}
                  variant={selectedTable === table ? 'contained' : 'outlined'}
                  onClick={() => fetchTableData(table)}
                  sx={{ justifyContent: 'flex-start' }}
                >
                  {table}
                </Button>
              ))}
            </Box>
          )}
        </Paper>

        {/* Table Data Viewer */}
        <Paper sx={{ p: 3, flex: 2 }}>
          {selectedTable && (
            <Typography variant="h6" gutterBottom>
              Data from {selectedTable}
            </Typography>
          )}
          
          {loading && selectedTable ? (
            <CircularProgress />
          ) : tableData ? (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {tableData.columns.map((column) => (
                      <TableCell key={column}>{column}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.data.map((row, i) => (
                    <TableRow key={i}>
                      {row.map((cell, j) => (
                        <TableCell key={j}>{cell}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography>Select a table to view data</Typography>
          )}
        </Paper>
      </Box>

      {/* Streamlit Integration */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          CSV Data Importer
        </Typography>
        <Paper sx={{ p: 3, height: '600px' }}>
          <iframe
            src={streamlitUrl}
            title="Streamlit CSV Importer"
            width="100%"
            height="100%"
            style={{ border: 'none' }}
            onLoad={handleDataImported}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default DatabaseConnection;