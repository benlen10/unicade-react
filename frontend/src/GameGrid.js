import React from 'react';
import { Card, CardImg, CardBody, CardTitle } from 'reactstrap';
import axios from 'axios';

const GameGrid = ({ games }) => {

  const handleGameClick = async (game) => {
    try {
      const response = await axios.post('http://localhost:3001/run-game', {
        gameName: game.GameTitle,
        platform: game.Platform
      });
      console.log(response.data);
      alert(response.data); // Alert the user about the success or failure
    } catch (error) {
      console.error('Error running game script:', error);
      alert('Error running game script');
    }
  };

  return (
    <div className="game-grid">
      {games.map((game) => (
        <Card key={game.GameTitle} onClick={() => handleGameClick(game)} style={{ cursor: 'pointer' }}>
          <CardImg top width="100%" src={game.BoxArtUrl} alt={game.GameTitle} />
          <CardBody>
            <CardTitle>{game.GameTitle}</CardTitle>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default GameGrid;