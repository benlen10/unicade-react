import React from 'react';

function GameGrid({ games }) {
  return (
    <div className="game-grid">
      {games.map(game => (
        <div key={game.GameTitle} className="game">
          <img src={game.BoxArtUrl} alt={game.GameTitle} />
          <p>{game.GameTitle}</p>
        </div>
      ))}
    </div>
  );
}

export default GameGrid;