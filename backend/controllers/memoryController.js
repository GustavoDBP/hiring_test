const Save = require('../models/save');

exports.saveGameData = async (req, res) => {
    const { userID, gameDate, failed, difficulty, completed, timeTaken } = req.body;

    console.log('Received data to save:', req.body);

    try {

        if (!userID || !gameDate || difficulty === undefined || completed === undefined || timeTaken === undefined) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newSave = new Save({
            userID,
            gameDate,
            failed,
            difficulty,
            completed,
            timeTaken,
        });

        await newSave.save();
        res.status(201).json({ message: 'Game data saved successfully' });
    } catch (error) {
        console.error('Error saving game data:', error);
        res.status(500).json({ message: 'Error saving game data', error });
    }
};

exports.getGameData = async (req, res) => {
    console.log('Fetching game data for userID:', req.params.userID);
    const { userID } = req.params; // Get userID from request parameters

    try {
        const saves = await Save.find({ userID }).sort({ gameDate: -1 }); // Sort by gameDate in descending order
        res.status(200).json(saves);
    } catch (error) {
        console.error('Error fetching game data:', error);
        res.status(500).json({ message: 'Error fetching game data', error });
    }
};