const express = require('express');
const axios = require('axios');
const { google } = require('googleapis');

const router = express.Router();

router.get('/events', async (req, res) => {
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

router.get('/list', async (req, res) => {
    // Get google acess token from request
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).send({error: 'Missing access token'});
    }

    try {
        // Send request to google API to get calendarList of user
        const response = await axios.get('https://www.googleapis.com/calendar/v3/users/me/calendarList', {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
        });
        
        console.log("GOOGLE RESPONSE:", response.data);

        // Return only calendars owned by user
        res.json(response.data.items.filter(calendar => calendar.accessRole === "owner"));
    } catch (error) {
        console.error("Error fetching calendar list:", error);
        res.status(500).send('Error fetching data');
    }
});

module.exports = router;