// Esperar a que el DOM se cargue completamente
document.addEventListener("DOMContentLoaded", function () {
    // Crear el mapa
    var map = L.map('map').setView([-34.6037, -58.3816], 13); // Buenos Aires

    // Capa de mapa base - Stamen Toner o OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 20
    }).addTo(map);
});

