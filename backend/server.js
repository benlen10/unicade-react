const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

const db = new sqlite3.Database('./games.db');

// Endpoint to get games by platform
app.get('/games', (req, res) => {
    const platform = req.query.platform;
    db.all('SELECT * FROM Games WHERE Platform = ?', [platform], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Endpoint to get all platforms
app.get('/platforms', (req, res) => {
    db.all('SELECT DISTINCT Platform FROM Games', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        const platforms = rows.map(row => row.Platform);
        res.json(platforms);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});