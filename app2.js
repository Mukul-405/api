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

app.get('/v1', async (req, res) => {
    try {
        const initialQueries = ['a', 'ivy', 'homes','soft','start','up'];
        const extractedNames = await extractAllNames(API_URL_V1, initialQueries);

        res.render('results2', {
            query: "Automated Extraction",
            names: Array.from(extractedNames),
            type: "v1"
        });
    } catch (err) {
        console.error('Error during automation:', err);
        res.render('index2', {
            error: `Error during automation: ${err.message}`
        });
    }
});
app.get('/v2', async (req, res) => {
    try {
        const initialQueries = ['am', 'bna', 'mna','zo','09'];
        const extractedNames = await extractAllNames(API_URL_V2, initialQueries);

        res.render('results2', {
            query: "Automated Extraction",
            names: Array.from(extractedNames),
            type: "v2"
        });
    } catch (err) {
        console.error('Error during automation:', err);
        res.render('index2', {
            error: `Error during automation: ${err.message}`
        });
    }
});
app.get('/v3', async (req, res) => {
    try {
        const initialQueries = ['+','9','muk','$','the','query','node','api','done','an','bf','do','iit'];
        const extractedNames = await extractAllNames(API_URL_V3, initialQueries);

        res.render('results2', {
            query: "Automated Extraction",
            names: Array.from(extractedNames),
            type: "v3"
        });
    } catch (err) {
        console.error('Error during automation:', err);
        res.render('index2', {
            error: `Error during automation: ${err.message}`
        });
    }
});

async function extractAllNames(apiUrl, initialQueries) {
    const extractedNames = new Set();
    const queriesToExplore = new Set(initialQueries);

    while (queriesToExplore.size > 0) {
        const currentQuery = queriesToExplore.values().next().value;
        queriesToExplore.delete(currentQuery);

        try {
            const response = await axios.get(`${apiUrl}${currentQuery}`);
            if (response.status === 200 && response.data.results) {
                for (const name of response.data.results) {
                    if (!extractedNames.has(name)) {
                        extractedNames.add(name);
                        queriesToExplore.add(name)
                    }
                }
            } else {
                console.log(`No results found for query "${currentQuery}"`);
            }
            await delay(100); // rate limiting
        } catch (err) {
            console.error(`Error fetching data for query "${currentQuery}":`, err.message);
        }
    }

    return extractedNames;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

app.listen(4000, () => console.log('Server running at http://localhost:4000'));