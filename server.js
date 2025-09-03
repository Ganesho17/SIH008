const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API key for the Gemini API. This should be kept secret.
// For local development, you can paste your key here.
const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"; // Replace with your actual key
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent";

app.get('/', (req, res) => {
    res.send('Chatbot backend is running. Please open the index.html file in your browser to use the app.');
});

app.post('/api/chatbot', async (req, res) => {
    try {
        const userMessage = req.body.message;
        if (!userMessage) {
            return res.status(400).json({ error: "Message is required." });
        }

        const payload = {
            contents: [{ parts: [{ text: `You are an expert on disaster preparedness. Provide a concise, helpful response to the following query. Keep the response short and to the point. Query: ${userMessage}` }] }],
            tools: [{ "google_search": {} }],
            systemInstruction: {
                parts: [{ text: "Act as an informative and helpful chatbot specializing in disaster preparedness and safety." }]
            },
        };

        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API call failed: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const data = await response.json();
        const botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (botResponse) {
            res.json({ text: botResponse });
        } else {
            res.status(500).json({ text: "Sorry, I couldn't generate a response." });
        }

    } catch (error) {
        console.error("Error in chatbot endpoint:", error);
        res.status(500).json({ text: "An internal server error occurred." });
    }
});

app.listen(port, () => {
    console.log(`Chatbot backend running at http://localhost:${port}`);
});