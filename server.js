const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

const config = new Configuration({
    apiKey: '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',
});

const openai = new OpenAIApi(config);

app.use(bodyParser.json());
app.use(cors());

// Define a route to handle incoming messages
app.post('/chat', async (req, res) => {
    try {
        const { prompt } = req.body;

        // Log the request details
        console.log('Request to OpenAI API:');
        console.log('Prompt:', prompt);

        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'user', content: prompt },
            ],
        });

        // Log the response details
        console.log('Response from OpenAI API:');
        console.log(response.data);

        const completion = response.data.choices[0].message.content;
        res.status(200).send(completion);
    }
    catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
