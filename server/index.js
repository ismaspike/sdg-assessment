// server/index.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const https = require('https');

const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
}

const app = express();
app.use(cors());

// Ignore SSL errors
const agent = new https.Agent({
  rejectUnauthorized: false
});

app.get('/continents', async (req, res) => {
  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/all?fields=region,population`,
      {
        httpsAgent: agent
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/countries', async (req, res) => {
  try {
    const region = req.query.continent || '';
    const response = await axios.get(
      `https://restcountries.com/v3.1/region/${region}`,
      {
        httpsAgent: agent
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
