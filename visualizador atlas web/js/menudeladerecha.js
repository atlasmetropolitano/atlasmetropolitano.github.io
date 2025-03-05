// ✅ Asegurar que `currentGeojsonLayer` no se redefine
if (!window.currentGeojsonLayer) {
    window.currentGeojsonLayer = null;
}

// 🚀 Esperar hasta que `map` esté listo antes de ejecutar código
document.addEventListener("mapReady", () => {
    console.log("🟢 `map` está listo en menudeladerecha.js. Ejecutando código...");

    function selectYear(element) {
        console.log("📌 Se hizo clic en un año:", element.textContent);

        document.querySelectorAll(".year").forEach(y => y.classList.remove("selected"));
        element.classList.add("selected");

        const geojsonUrl = element.getAttribute("data-geojson");

        if (!geojsonUrl) {
            console.warn("⚠️ No se encontró el archivo GeoJSON para este año.");
            return;
        }

        console.log("🗺️ Cargando GeoJSON:", geojsonUrl);

        if (!window.map || !(window.map instanceof L.Map)) {
            console.error("🚨 Error: `window.map` no es un objeto válido de Leaflet.");
            console.log("Valor actual de `window.map`:", window.map);
            return;
        }
        

        // ✅ Remover capa anterior si existe
        if (window.currentGeojsonLayer && window.map.hasLayer(window.currentGeojsonLayer)) {
            window.map.removeLayer(window.currentGeojsonLayer);
            window.currentGeojsonLayer = null;
        }

        // ✅ Cargar el nuevo GeoJSON
        fetch(geojsonUrl)
            .then(response => {
                if (!response.ok) throw new Error(`❌ No se pudo cargar el archivo GeoJSON: ${response.status}`);
                return response.json();
            })
            .then(geojsonData => {
                console.log("✅ GeoJSON cargado correctamente:", geojsonData);

                if (!geojsonData.features || geojsonData.features.length === 0) {
                    throw new Error("⚠️ El GeoJSON está vacío o no tiene datos válidos.");
                }

                geojsonData.features.forEach(feature => {
                    console.log("📍 Coordenadas del feature:", feature.geometry.coordinates);
                });

                // ✅ Crear capa GeoJSON
                window.currentGeojsonLayer = L.geoJSON(geojsonData, {
                    style: { color: "#0078A0", weight: 2, fillOpacity: 0.5 },
                    onEachFeature: (feature, layer) => {
                        let popupContent = "<b>Información:</b><br>";
                        Object.entries(feature.properties).forEach(([key, value]) => {
                            popupContent += `<b>${key}:</b> ${value}<br>`;
                        });
                        layer.bindPopup(popupContent);
                    }
                });

                // ✅ Agregar la capa si `map` es válido
                if (window.map && window.currentGeojsonLayer) {
                    window.currentGeojsonLayer.addTo(window.map);
                    window.map.fitBounds(window.currentGeojsonLayer.getBounds());
                } else {
                    console.error("❌ No se pudo agregar la capa GeoJSON porque `map` no está listo.");
                }
                
            })
            .catch(error => console.error("🚨 Error cargando el GeoJSON:", error));
    }

    // ✅ Asignar eventos a los botones de los años
    document.querySelectorAll(".year").forEach(year => {
        year.addEventListener("click", function () {
            selectYear(this);
        });
    });

    // ✅ Seleccionar el año activo si hay uno
    const selectedYear = document.querySelector(".year.selected");
    if (selectedYear) {
        console.log("📌 Seleccionando año activo:", selectedYear.textContent);
        selectYear(selectedYear);
    }
});
