const express = require('express');
const router = express.Router();
const axios = require('axios');
const multer = require('multer');
const FormData = require('form-data');
const fs = require('fs');

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';

// Set up multer
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); // Folder to save images
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname)); // Use current date as filename
//     }
// });

const upload = multer({ dest: 'uploads/' });


router.post('/read-image', upload.single('image'), async (req, res) => {
    try {
        const tmpFilePath = req.file.path // Temporary path created by multer
        const fileStream = fs.createReadStream(tmpFilePath);

        const formData = new FormData();
        formData.append('file', fileStream, req.file.originalname)
        
        console.log("BACKEND IMAGE", formData);
    //     const response = await axios.post(
    //         ANTHROPIC_API_URL,
    //         {
    //             model: "claude-3-opus-20240229",
    //             max_tokens: 1024,
    //             messages: [{
    //                 role: "user",
    //                 content: [
    //                     {
    //                         type: "text",
    //                         text: "Please analyze this image and describe what you see in detail."
    //                     },
    //                     {
    //                         type: "image",
    //                         source: {
    //                             type: "base64",
    //                             media_type: "image/jpeg",
    //                             data: imageData
    //                         }
    //                     }
    //                 ]
    //             }]
    //         },
    //         {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'x-api-key': ANTHROPIC_API_KEY,
    //                 'anthropic-version': '2023-06-01'
    //             }
    //         }
    //     );

        res.status(200).send("UPLOAD OK")
    } catch (error) {
        console.error('Error analyzing image:', error);
        res.status(500).json({
            error: 'Failed to analyze image',
            details: error.response?.data || error.message
        });
    } finally {
        fs.unlinkSync(req.file.path); // Remove file from server
    }
});

module.exports = router;