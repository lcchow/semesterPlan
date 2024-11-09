const { Anthropic } = require("@anthropic-ai/sdk");
const express = require('express');
const router = express.Router();
const axios = require('axios');
const multer = require('multer');
const FormData = require('form-data');
const fs = require('fs');
const sharp = require('sharp')


const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';
const CLAUDE_SONNET_LATEST = 'claude-3-5-sonnet-20241022';
const CLAUDE_SONNET_3 = "claude-3-sonnet-20240229"

const PROMPT = "Please extract all assignment/homework deadlines and quiz/exam dates from this course schedule image. For each item, create a JSON object with summary, start, and end properties formatted for Google Calendar API. Use specific times when given, otherwise default to 11:59 PM PST for due dates. Format dates as ISO 8601 strings using America/Vancouver timezone."
const PROMPT2 = "Extract only assignment and homework deadlines, quizzes and exam dates into this exact JSON format, using 23:59:00-07:00 for items without specific times. Include only these properties: summary, start.dateTime, end.dateTime. Times should be in America/Vancouver timezone:\n{\"items\": [{\"summary\": \"\", \"start\": {\"dateTime\": \"\"}, \"end\": {\"dateTime\": \"\"}}]}"

const anthropic = new Anthropic({
    apiKey: ANTHROPIC_API_KEY,
})

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 25 * 1024 * 1024 // 25MB limit
    },
    fileFilter: (req, file, cb) => {
      // Accept only image files
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Not an image! Please upload an image.'));
      }
    }
  });


router.post('/read-image', upload.single('image'), async (req, res) => {
    try {

        console.log('Received file:', {
            originalName: req.file.originalname,
            mimeType: req.file.mimetype,
            size: req.file.size
          });


        // Scale down image and greyscale for API call
        let optimizationPipeline = sharp(req.file.buffer)
        .grayscale()
        .resize(800, 1200, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({
                quality: 60,
                force: true
        });
        

        const optimizedImg = await optimizationPipeline.toBuffer();

        // Add error checking for final size
        if (optimizedImg.length > 5 * 1024 * 1024) { // 5MB limit
            return res.status(400).json({
            error: 'Image still too large after optimization'
            });
        }

        const imgBase64 = optimizedImg.toString('base64');
        const imgUrl = `data:image/jpeg;base64,${imgBase64}`;
        
        const messages = [
            {
                role: "user",
                content: [
                  {
                    type: "text",
                    text: `${PROMPT}`
                  },
                  {
                    type: "image",
                    source: {
                        type: "base64",
                        media_type: "image/jpeg",
                        data: imgBase64
                    }
                  }
                ]
            }
        ]

        // Make API call to Claude API
        const response = await anthropic.messages.create({
            model: CLAUDE_SONNET_LATEST,
            max_tokens: 1024,
            messages: messages
        })

        console.log(response)
        res.json(response.content)    
    } catch (error) {
        console.error('Error analyzing image:', error);
        res.status(500).json({
            error: 'Failed to analyze image',
            details: error.response?.data || error.message
        });
    } 
});

module.exports = router;