const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config(); 

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const API_URL_V1 = 'http://35.200.185.69:8000/v1/autocomplete?query=';
const API_URL_V2 = 'http://35.200.185.69:8000/v2/autocomplete?query=';
const API_URL_V3 = 'http://35.200.185.69:8000/v3/autocomplete?query=';

app.get('/v1', (req, res) => {
    res.render('index1', { type: "v1" });
});

app.get('/v2', (req, res) => {
    res.render('index1', { type: "v2" });
});
app.get('/v3', (req, res) => {
    res.render('index1', { type: "v3" });
});

app.post('/search/v1', async (req, res) => {
    const query = req.body.query;

    try {
        console.log(`Fetching data for query: ${query}`);
        const response = await axios.get(`${API_URL_V1}${query}`);
        console.log('API Response:', JSON.stringify(response.data, null, 2));

        const names = response.data.results || [];

        res.render('results', {
            query,
            names: names,
            type: "v1"
        });
    } catch (err) {
        console.error('Error details:', err);
        res.render('index1', {
            error: `Error fetching results: ${err.message}`
        });
    }
});
app.post('/search/v2', async (req, res) => {
    const query = req.body.query;

    try {
        console.log(`Fetching data for query: ${query}`);
        const response = await axios.get(`${API_URL_V2}${query}`);
        console.log('API Response:', JSON.stringify(response.data, null, 2));

        const names = response.data.results || [];

        res.render('results', {
            query,
            names: names,
            type: "v2"
        });
    } catch (err) {
        console.error('Error details:', err);
        res.render('index1', {
            error: `Error fetching results: ${err.message}`
        });
    }
});
app.post('/search/v3', async (req, res) => {
    const query = req.body.query;

    try {
        console.log(`Fetching data for query: ${query}`);
        const response = await axios.get(`${API_URL_V3}${query}`);
        console.log('API Response:', JSON.stringify(response.data, null, 2));

        const names = response.data.results || [];

        res.render('results', {
            query,
            names: names,
            type: "v3"
        });
    } catch (err) {
        console.error('Error details:', err);
        res.render('index1', {
            error: `Error fetching results: ${err.message}`
        });
    }
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
