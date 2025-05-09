const express = require('express');
const { saveGameData, getGameData } = require('../controllers/memoryController');
const router = express.Router();

// Route to save game data
router.post('/save', saveGameData);
router.get('/data/:userID', getGameData);

module.exports = router;
