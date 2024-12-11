const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let appointments = [];

app.post('/appointments', async (req, res) => {
    try {
        const appointment = {
            id: Date.now(),
            ...req.body,
            created: new Date().toISOString()
        };
        appointments.push(appointment);
        await axios.post(process.env.KESTRA_WEBHOOK_URL, appointment);
        res.status(201).json(appointment);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to create appointment' });
    }
});

app.get('/appointments', (req, res) => {
    res.json(appointments);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});