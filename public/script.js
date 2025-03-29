async function getWeather() {
    const city = document.getElementById("city").value;
    if (!city) {
        alert("Masukkan nama kota!");
        return;
    }

    const response = await fetch(`/api/weather?city=${city}`);
    const data = await response.json();

    if (data.error) {
        document.getElementById("result").innerHTML = `<p>${data.error}</p>`;
    } else {
        document.getElementById("result").innerHTML = `
            <h2>${data.name}, ${data.country}</h2>
            <p>Temperatur: ${data.temp}°C</p>
            <p>Kondisi: ${data.weather}</p>
        `;
    }
}
