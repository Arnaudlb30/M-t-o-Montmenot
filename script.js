const apiKey = 'efee6ee3f64ffcc6a52ad0f3373e8e02';
const lat = 45.821887;
const lon = 4.486525;
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${apiKey}`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.cod === 200) { // Vérifier si la requête a réussi
            document.getElementById('description').innerText = `Description: ${data.weather[0].description}`;
            document.getElementById('temperature').innerText = `Température: ${data.main.temp}°C`;
            document.getElementById('humidity').innerText = `Humidité: ${data.main.humidity}%`;
        } else {
            document.getElementById('weather').innerText = `Erreur: ${data.message}`;
        }

        // Initialiser la carte
        var map = L.map('map').setView([lat, lon], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(map);

        // Ajouter un marqueur
        var marker = L.marker([lat, lon]).addTo(map);
        marker.bindPopup(`<b>Ancy</b><br>${data.weather[0].description}<br>Température: ${data.main.temp}°C<br>Humidité: ${data.main.humidity}%`).openPopup();
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données météo :', error);
        document.getElementById('weather').innerText = 'Erreur lors de la récupération des données météo.';
    });
