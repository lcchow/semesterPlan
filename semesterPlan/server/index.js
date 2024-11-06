const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');
const calendarRoutes = require('./routes/calendar');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const imageRoutes = require('./routes/image');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());  

app.use('/calendar', calendarRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/image', imageRoutes);

app.get('/', (req, res) => {
    res.send('Testing backend');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});