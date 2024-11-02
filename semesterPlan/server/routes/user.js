const express = require('express');
const router = express.Router();
const fetch = require('node-fetch'); // If using Node <18, make sure you install node-fetch

router.post('/userinfo', async (req, res) => {
    const { token } = req.body; // Get the access token from the request body
    console.log("BACKEND:",token)

    if (!token) {
        return res.status(400).json({ error: "Access token is required" });
    }

    try {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            return res.status(response.status).json({ error: "Failed to fetch user info" });
        }

        const userInfo = await response.json();
        res.status(200).json(userInfo);
    } catch (error) {
        console.error("Error fetching user info:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;