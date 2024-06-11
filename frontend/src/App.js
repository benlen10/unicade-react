import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import GameGrid from './GameGrid';
import { CssBaseline, Button } from '@mui/material';
import { Container } from 'react-bootstrap';
import './App.css';

function App() {
  const [platforms, setPlatforms] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchPlatforms = async () => {
      const response = await axios.get('http://localhost:3001/platforms');
      setPlatforms(response.data);
    };

    fetchPlatforms();
  }, []);

  useEffect(() => {
    if (selectedPlatform) {
      const fetchGames = async () => {
        const response = await axios.get(`http://localhost:3001/games?platform=${selectedPlatform}`);
        setGames(response.data);
      };

      fetchGames();
    }
  }, [selectedPlatform]);

  const handleScan = async () => {
    try {
      await axios.post('http://localhost:3001/scan');
      const response = await axios.get(`http://localhost:3001/games?platform=${selectedPlatform}`);
      setGames(response.data);
    } catch (error) {
      console.error('Error scanning for new games:', error);
    }
  };

  return (
    <>
      <CssBaseline />
      <div className="app d-flex">
        <Sidebar platforms={platforms} setSelectedPlatform={setSelectedPlatform} />
        <div className="content">
          <Button variant="contained" color="primary" onClick={handleScan}>
            Scan for New Games
          </Button>
          <GameGrid games={games} />
        </div>
      </div>
    </>
  );
}

export default App;