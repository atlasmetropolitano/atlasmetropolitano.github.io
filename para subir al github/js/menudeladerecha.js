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
    
        // ✅ Remover cualquier capa previa
        if (window.lastLayer && window.map.hasLayer(window.lastLayer)) {
            window.map.removeLayer(window.lastLayer);
        }
    
        // ✅ Cargar el nuevo GeoJSON
        fetch(geojsonUrl)
            .then(response => response.json())
            .then(geojsonData => {
                console.log("✅ GeoJSON cargado correctamente:", geojsonData);
    
                if (!geojsonData.features || geojsonData.features.length === 0) {
                    throw new Error("⚠️ El GeoJSON está vacío o no tiene datos válidos.");
                }
    
                // ✅ Crear capa GeoJSON y almacenarla en window.lastLayer
                // ✅ Obtener valores del atributo a analizar (ejemplo: "M1_PRECIPI")
const attribute = "F__NBI"; // Cambia por el nombre real en el GeoJSON
const values = geojsonData.features
    .map(f => f.properties[attribute])
    .filter(v => v !== undefined && !isNaN(v));

if (values.length === 0) {
    console.warn("⚠️ No se encontraron valores válidos para el atributo", attribute);
    return;
}

// ✅ Calcular cuantiles en 5 categorías
const quantiles = calculateQuantiles(values, 5);

function getColor(value) {
    if (value <= quantiles[0]) return "#fee5d9";
    if (value <= quantiles[1]) return "#fcae91";
    if (value <= quantiles[2]) return "#fb6a4a";
    if (value <= quantiles[3]) return "#de2d26";
    return "#a50f15";
}


// ✅ Crear capa GeoJSON con cuantiles
window.lastLayer = L.geoJSON(geojsonData, {
    style: feature => ({
        color: "#000",
        weight: 1,
        fillColor: getColor(feature.properties[attribute], quantiles),
        fillOpacity: 0.7
    }),
    onEachFeature: function(feature, layer) {
        let popupContent = `<b>Información:</b><br>`;
        Object.entries(feature.properties).forEach(([key, value]) => {
            popupContent += `<b>${key}:</b> ${value}<br>`;
        });
        layer.bindPopup(popupContent);
    }
});



    
                // ✅ Agregar la capa si `map` es válido
                if (window.map && window.lastLayer) {
                    window.lastLayer.addTo(window.map);
                    window.map.fitBounds(window.lastLayer.getBounds());
                    console.log("🟢 Capa GeoJSON agregada al mapa.");
                }
    
                // ✅ Extraer información general y actualizar el panel lateral con los cuantiles
                    updateInfoPanel(geojsonData, element.textContent, quantiles);

            })
            .catch(error => console.error("🚨 Error cargando el GeoJSON:", error));
    }

    function updateInfoPanel(geojsonData, selectedYear, quantiles) {

        console.log("🔍 Actualizando panel de información para el año:", selectedYear);
    
        // ✅ Obtener valores del atributo que queremos analizar (ejemplo: "M1_PRECIPI")
        const attribute = "F__NBI"; // Cambiar por el nombre real del atributo en el GeoJSON
        const values = geojsonData.features
            .map(f => f.properties[attribute])
            .filter(v => v !== undefined && !isNaN(v));
    
        if (values.length === 0) {
            console.warn("⚠️ No se encontraron valores válidos para el atributo", attribute);
            return;
        }
    
        // Ya no es necesario calcular cuantiles aquí, los recibimos desde `selectYear()`
        // ✅ Calcular cuantiles para dividir en 5 categorías
        // const quantiles = calculateQuantiles(values, 5);
        
        // ✅ Actualizar la sección "Información General"
        // document.querySelector(".stats").innerHTML = `
        //     <h2>Información General - ${selectedYear}</h2>
        //     <p><strong>Habitantes:</strong> ${geojsonData.features.length * 1000}</p>
        //     <p><strong>Hogares:</strong> ${geojsonData.features.length * 500}</p>
        //     <p><strong>Área:</strong> ${geojsonData.features.length * 10} km²</p>
        // `;
    
        // ✅ Actualizar la sección "Precipitaciones" con cuantiles
        document.querySelector(".density-list").innerHTML = `
    <h2>Necesidades Básicas Insatisfechas</h2>
    <ul>
        <li><span class="icon" style="background:${getColor(quantiles[0], quantiles)}"></span> Menor a ${quantiles[0].toFixed(2)} </li>
        <li><span class="icon" style="background:${getColor(quantiles[1], quantiles)}"></span> ${quantiles[0].toFixed(2)} a ${quantiles[1].toFixed(2)} </li>
        <li><span class="icon" style="background:${getColor(quantiles[2], quantiles)}"></span> ${quantiles[1].toFixed(2)} a ${quantiles[2].toFixed(2)} </li>
        <li><span class="icon" style="background:${getColor(quantiles[3], quantiles)}"></span> ${quantiles[2].toFixed(2)} a ${quantiles[3].toFixed(2)} </li>
        <li><span class="icon" style="background:${getColor(quantiles[3] + 1, quantiles)}"></span> Mayor a ${quantiles[3].toFixed(2)} </li>
    </ul>
`;

    
        console.log("✅ Panel de información actualizado.");
    }

    function calculateQuantiles(values, numQuantiles) {
        values.sort((a, b) => a - b);
        let quantiles = [];
        for (let i = 1; i < numQuantiles; i++) {
            quantiles.push(values[Math.floor(values.length * (i / numQuantiles))]);
        }
        return quantiles;
    }
    
    
    function getColor(value, quantiles) {
        if (value <= quantiles[0]) return "#fee5d9";
        if (value <= quantiles[1]) return "#fcae91";
        if (value <= quantiles[2]) return "#fb6a4a";
        if (value <= quantiles[3]) return "#de2d26";
        return "#a50f15";

        // if (value <= quantiles[0]) return "#edf8fb";  // Azul claro
        // if (value <= quantiles[1]) return "#b2e2e2";  // Celeste
        // if (value <= quantiles[2]) return "#66c2a4";  // Verde claro
        // if (value <= quantiles[3]) return "#2ca25f";  // Verde fuerte
        // return "#006d2c";  // Verde oscuro
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



// 📌 Función para actualizar la información general al seleccionar un año
function updateInfo(year) {
    const data = {
        "2001": { "Habitantes": 3626932, "Hogares": 17860, "Área (km²)": 13916.94 },
        "2010": { "Habitantes": 4368374, "Hogares": 17860, "Área (km²)": 13916.94 },
        "2022": { "Habitantes": 5434762, "Hogares": 17860, "Área (km²)": 13916.94 }
    };

    if (data[year]) {
        document.querySelector(".stats p:nth-child(2)").innerHTML = `<strong>Habitantes:</strong> ${data[year].Habitantes.toLocaleString()}`;
        document.querySelector(".stats p:nth-child(3)").innerHTML = `<strong>Hogares:</strong> ${data[year].Hogares.toLocaleString()}`;
        document.querySelector(".stats p:nth-child(4)").innerHTML = `<strong>Área:</strong> ${data[year]["Área (km²)"].toLocaleString()} km²`;
    }
}

// Agregar eventos de clic a los botones de los años
document.querySelectorAll(".year").forEach(button => {
    button.addEventListener("click", function() {
        const year = this.getAttribute("data-geojson").match(/(\d{4})/)[0];
        updateInfo(year);
    });


    document.addEventListener("syncMenuRight", (event) => {
        const selectedTopic = event.detail.topic; // Obtener el tema desde el menú izquierdo
        console.log(`📌 Tema seleccionado en el menú izquierdo: ${selectedTopic}`);
    
        // 🔹 Buscar y actualizar el menú derecho
        const menuRightTitle = document.getElementById("menu-right-title"); // Ajusta este ID según tu HTML
    
        if (menuRightTitle) {
            menuRightTitle.innerText = selectedTopic;
            console.log(`✅ Menú derecho actualizado con: ${selectedTopic}`);
        } else {
            console.warn("⚠️ No se encontró el elemento del menú derecho para actualizar.");
        }
    });
    
});
