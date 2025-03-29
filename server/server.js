const express = require("express");
const axios = require("axios");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.OPENWEATHER_API_KEY; 

app.use(express.static(path.join(__dirname, "../public")));

app.get("/api/weather", async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.json({ error: "Kota tidak boleh kosong" });
    }

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await axios.get(url);
        const weatherData = response.data;

        res.json({
            name: weatherData.name,
            country: weatherData.sys.country,
            temp: weatherData.main.temp,
            weather: weatherData.weather[0].description,
        });
    } catch (error) {
        res.json({ error: "Gagal mendapatkan data cuaca" });
    }
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
