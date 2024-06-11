import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import GameGrid from './GameGrid';

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
    <div className="app">
      <Sidebar platforms={platforms} setSelectedPlatform={setSelectedPlatform} />
      <GameGrid games={games} />
    </div>
  );
}

export default App;