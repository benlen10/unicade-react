const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./games.db');

const configFilePath = './config.json';
const mobyGamesApiKey = 'moby_uue5l7SYfx4oQoAicNd4Sy5SkT0'; // Replace with your actual API key

const platformIdMap = {
  Playstation: 6,
  PSP: 46
};

// Function to pause execution for a given duration
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to scan directories for ROM files
async function scanDirectories() {
  console.log('Scanning directories...');
  const config = JSON.parse(fs.readFileSync(configFilePath, 'utf8'));
  const directories = config.directories;

  for (const dir of directories) {
    console.log(`Scanning directory: ${dir}`);
    const platform = path.basename(dir); // Assuming the directory name is the platform name
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      if (fs.lstatSync(filePath).isFile() && path.extname(file) === '.rom') {
        const gameTitle = path.basename(file, '.rom');
        console.log(`Found ROM file: ${filePath}`);
        await fetchAndSaveGameMetadata(gameTitle, platform, filePath);
        await delay(1500); // Pause for 1.5 seconds between API calls
      }
    }
  }

  console.log('Directory scan complete');
}

// Function to fetch game metadata from MobyGames API
async function fetchGameMetadata(gameTitle, platform) {
  const platformId = platformIdMap[platform];
  if (!platformId) {
    console.error(`No platform ID found for platform: ${platform}`);
    return null;
  }

  const apiUrl = `https://api.mobygames.com/v1/games?title=${encodeURIComponent(gameTitle)}&platform=${platformId}&api_key=${mobyGamesApiKey}`;
  console.log(`Fetching metadata for ${gameTitle} on ${platform} from ${apiUrl}`);
  try {
    const response = await axios.get(apiUrl);
    // console.log(response.data.games[0]);
    if (response.data && response.data.games.length > 0) {
      const gameData = response.data.games[0];
      console.log(gameData)
      return {
        title: gameData.title,
        releaseDate: gameData.release_date,
        coverArtUrl: gameData.sample_cover.image
      };
    }
  } catch (error) {
    console.error(`Error fetching metadata for ${gameTitle} on ${platform}:`, error.message);
  }
  return null;
}

// Function to fetch and save game metadata
async function fetchAndSaveGameMetadata(gameTitle, platform, filePath) {
  const gameMetadata = await fetchGameMetadata(gameTitle, platform);
  console.log(gameMetadata);
  if (gameMetadata) {
    db.run(
      `INSERT INTO games (GameTitle, Platform, ReleaseDate, BoxArtUrl, FilePath) VALUES (?, ?, ?, ?, ?)`,
      [gameMetadata.title, platform, gameMetadata.releaseDate, gameMetadata.coverArtUrl, filePath],
      function (err) {
        if (err) {
          return console.error(`Error inserting ${gameTitle} for platform ${platform} into the database:`, err.message);
        }
        console.log(`Added ${gameTitle} for platform ${platform} to the database`);
      }
    );
  } else {
    console.log(`No metadata found for ${gameTitle} on ${platform}`);
  }
}

app.get('/platforms', (req, res) => {
  db.all('SELECT DISTINCT Platform FROM games', [], (err, rows) => {
    if (err) {
      console.error('Error fetching platforms:', err.message);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(rows.map(row => row.Platform));
  });
});

app.get('/games', (req, res) => {
  const platform = req.query.platform;
  db.all('SELECT * FROM games WHERE Platform = ?', [platform], (err, rows) => {
    if (err) {
      console.error('Error fetching games:', err.message);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(rows);
  });
});

// Endpoint to trigger directory scan
app.post('/scan', async (req, res) => {
  console.log('Scan endpoint called');
  await scanDirectories();
  res.send('Directory scan complete');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});