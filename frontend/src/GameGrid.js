import React from 'react';
import './GameGrid.css';

function GameGrid({ games }) {
  return (
    <div className="game-grid">
      {games.map(game => (
        <div key={game.GameTitle} className="game">
          <img src={game.BoxArtUrl} alt={game.GameTitle} className="img-fluid" />
          <p>{game.GameTitle}</p>
        </div>
      ))}
    </div>
  );
}

export default GameGrid;