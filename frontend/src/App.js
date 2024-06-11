import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import GameGrid from './GameGrid';
import { CssBaseline } from '@mui/material';
import { Container } from 'react-bootstrap';
import './App.css'; // Ensure you have the correct styles imported

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

  return (
    <>
      <CssBaseline />
      <div className="app d-flex">
        <Sidebar platforms={platforms} setSelectedPlatform={setSelectedPlatform} />
        <GameGrid games={games} />
      </div>
    </>
  );
}

export default App;