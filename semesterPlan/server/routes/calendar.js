const express = require('express');
const axios = require('axios');
const { google } = require('googleapis');

const router = express.Router();

router.post('/events', async (req, res) => {
    const { token } = req.body;

    try {
        const response = await axios.get('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
        });
        
        console.log("GOOGLE RES:", response.data);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching calendar events:", error);
        res.status(500).send('Error fetching data');
    }
});

module.exports = router;