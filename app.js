const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/getWeather', async(req, res) => {
    try {
        const { cities } = req.body;
        const weatherData = await getWeatherData(cities);
        res.json({ weather: weatherData });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

async function getWeatherData(cities) {
    // Implement logic to fetch real-time weather data from a weather API
    // Example using OpenWeatherMap API
    const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
    const weatherPromises = cities.map(city =>
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(response => ({
            [city]: response.data.main.temp
        }))
    );
    const weatherResults = await Promise.all(weatherPromises);
    return Object.assign({}, ...weatherResults);
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});