
var express = require('express');
var router = express.Router();

require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

router.post('/llm', async function(req, res) {

    try {

        const { message } = req.body;

        // Send message to Gemini
        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash-lite",
            contents: message
        });

        // Get Gemini response
        const answer = response.text;

        // Send response to frontend
        res.json({
            answer: answer
        });

    }
    catch (error) {

        console.log("Gemini Error:", error);

        res.status(500).json({
            answer: "Sorry! Our AI assistant is temporarily unavailable."
        });

    }

});

module.exports = router;
