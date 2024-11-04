require('dotenv').config();
const express = require('express');
const {OAuth2Client} = require('google-auth-library');
  
const router = express.Router();

const oAuth2Client = new OAuth2Client(
process.env.GOOGLE_CLIENT_ID,
process.env.GOOGLE_CLIENT_SECRET,
'postmessage',
);


router.post('/auth/google', async (req, res) => {
    const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens
    console.log(tokens);

    res.json(tokens);
});

router.post('/auth/google/refresh-token', async (req, res) => {
    const user = new UserRefreshClient(
        clientId,
        clientSecret,
        req.body.refreshToken,
    );
    const { credentials } = await user.refreshAccessToken(); // obtain new access token
    res.json(credentials);
})

module.exports = router;
