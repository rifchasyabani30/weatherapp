const express = require("express");
const axios = require("axios");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;
const API_KEY = process.env.OPENWEATHER_API_KEY;

// Debugging: Cek apakah API Key tersedia
console.log("API Key:", API_KEY ? "Tersedia" : "Tidak ditemukan");

// Middleware
app.use(cors());
app.use(express.static(__dirname)); // Gunakan root sebagai static folder

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html")); // Arahkan langsung ke root
});

app.get("/api/weather", async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.json({ error: "Kota tidak boleh kosong" });
    }

    if (!API_KEY) {
        return res.json({ error: "API Key tidak ditemukan. Pastikan sudah dikonfigurasi dengan benar di Azure." });
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
        console.error("Error mengambil data cuaca:", error.response ? error.response.data : error.message);
        res.json({ error: "Gagal mendapatkan data cuaca. Periksa API Key atau kota yang dimasukkan." });
    }
});

app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
