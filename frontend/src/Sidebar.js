import React from 'react';

function Sidebar({ platforms, setSelectedPlatform }) {
  return (
    <div className="sidebar">
      <ul>
        {platforms.map(platform => (
          <li key={platform} onClick={() => setSelectedPlatform(platform)}>
            {platform}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;