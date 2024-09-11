// Inicializa el mapa
var map = L.map('map').setView([0, 0], 2);

// Añadir capa base de OpenStreetMap
var baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
}).addTo(map);

// Añadir barra de escala
L.control.scale().addTo(map);

// Añadir mini-mapa
var miniMapLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 0, maxZoom: 13
});
new L.Control.MiniMap(miniMapLayer, { toggleDisplay: true }).addTo(map);

var geojsonLayer;  // Variable para almacenar la capa GeoJSON cargada
var layerControl = L.control.layers().addTo(map);  // Control de capas de Leaflet
var layers = {};  // Objeto para almacenar las capas cargadas

// Función para manejar la creación de popups en elementos GeoJSON
function onEachFeature(feature, layer) {
    if (feature.properties) {
        var popupContent = "<h3>Información del Elemento</h3>";
        // Mostrar los atributos en el popup
        for (var key in feature.properties) {
            popupContent += "<b>" + key + ":</b> " + feature.properties[key] + "<br>";
        }
        layer.bindPopup(popupContent);
    }
}

// Función para aplicar estilo basado en valor único
function applyUniqueStyle(attribute) {
    var uniqueValues = new Set();
    geojsonLayer.eachLayer(function(layer) {
        if (layer.feature.properties[attribute]) {
            uniqueValues.add(layer.feature.properties[attribute]);
        }
    });

    var colors = generateColorPalette(Array.from(uniqueValues));

    geojsonLayer.eachLayer(function(layer) {
        var value = layer.feature.properties[attribute];
        if (value) {
            layer.setStyle({
                fillColor: colors[value],
                color: colors[value],
                weight: 2,
                opacity: 1,
                fillOpacity: 0.7
            });
        }
    });
}

// Función para aplicar estilo graduado
function applyGraduatedStyle(attribute) {
    var values = [];
    geojsonLayer.eachLayer(function(layer) {
        if (layer.feature.properties[attribute]) {
            values.push(layer.feature.properties[attribute]);
        }
    });

    var min = Math.min.apply(Math, values);
    var max = Math.max.apply(Math, values);
    var colorScale = chroma.scale(['#fafa6e', '#2A4858']).domain([min, max]);

    geojsonLayer.eachLayer(function(layer) {
        var value = layer.feature.properties[attribute];
        if (value) {
            layer.setStyle({
                fillColor: colorScale(value),
                color: colorScale(value),
                weight: 2,
                opacity: 1,
                fillOpacity: 0.7
            });
        }
    });
}

// Función para aplicar estilo basado en Natural Breaks (Jenks) con cinco categorías
function applyNaturalBreaksStyle(attribute) {
    var values = [];

    // Recolectar todos los valores del atributo seleccionado
    geojsonLayer.eachLayer(function(layer) {
        if (layer.feature.properties[attribute]) {
            values.push(layer.feature.properties[attribute]);
        }
    });

    // Usar la biblioteca simple-statistics para calcular los intervalos de natural breaks
    var breaks = ss.jenks(values, 5);  // Calcular 5 clases
    var colorScale = chroma.scale(['#f7fbff', '#08306b']).classes(breaks);  // Asignar colores según los breaks

    // Aplicar los estilos a cada capa
    geojsonLayer.eachLayer(function(layer) {
        var value = layer.feature.properties[attribute];
        if (value) {
            layer.setStyle({
                fillColor: colorScale(value),
                color: colorScale(value),
                weight: 2,
                opacity: 1,
                fillOpacity: 0.7
            });
        }
    });
}

// Función para cargar un archivo JSON o GeoJSON
function loadJSON(file, layerName) {
    var reader = new FileReader();
    reader.onload = function(e) {
        try {
            var jsonData = JSON.parse(e.target.result);
            geojsonLayer = L.geoJSON(jsonData, {
                onEachFeature: onEachFeature
            }).addTo(map);

            layers[layerName] = geojsonLayer;
            layerControl.addOverlay(geojsonLayer, layerName);

            map.fitBounds(geojsonLayer.getBounds());

            // Poblar el select de atributos con los atributos del primer feature
            if (jsonData.features.length > 0) {
                populateAttributeSelect(jsonData.features[0].properties);
            }

        } catch (error) {
            alert("Error al procesar el archivo JSON: " + error.message);
        }
    };
    reader.readAsText(file);
}

// Función para cargar un archivo Shapefile (en formato .zip o .shp)
function loadShapefile(file, layerName) {
    var reader = new FileReader();
    reader.onload = function(e) {
        // Utilizamos shp.js para leer el archivo ZIP o SHP y convertirlo a GeoJSON
        shp(e.target.result).then(function(geojson) {
            // Añadir el GeoJSON al mapa
            geojsonLayer = L.geoJSON(geojson, {
                onEachFeature: onEachFeature
            }).addTo(map);

            layers[layerName] = geojsonLayer;
            layerControl.addOverlay(geojsonLayer, layerName);

            map.fitBounds(geojsonLayer.getBounds());

            // Poblar el select de atributos con los atributos del primer feature
            if (geojson.features.length > 0) {
                populateAttributeSelect(geojson.features[0].properties);
            }
        }).catch(function(error) {
            alert("Error al procesar el archivo SHP: " + error.message);
        });
    };
    reader.readAsArrayBuffer(file);
}

// Modificamos el evento para manejar archivos .shp, .zip, .json, .geojson, .wms y .wmts
document.getElementById('fileInput').addEventListener('change', function(event) {
    var file = event.target.files[0];
    var layerName = file.name;

    if (file.name.endsWith('.json') || file.name.endsWith('.geojson')) {
        loadJSON(file, layerName);
    } else if (file.name.endsWith('.zip') || file.name.endsWith('.shp')) {
        loadShapefile(file, layerName);  // Usamos la nueva función que soporta .shp y .zip
    } else if (file.name.endsWith('.wms')) {
        addWMSLayer(file.url, layerName);  // Función que soporta WMS
    } else if (file.name.endsWith('.wmts')) {
        addWMTSLayer(file.url, layerName, 'default');  // Función que soporta WMTS
    } else {
        alert("Por favor, selecciona un archivo JSON, GeoJSON, SHP, ZIP, WMS o WMTS.");
    }
});

// Función para poblar el select de atributos
function populateAttributeSelect(properties) {
    var attributeSelect = document.getElementById('attributeSelect');
    attributeSelect.innerHTML = ''; // Limpia el select actual
    for (var key in properties) {
        var option = document.createElement('option');
        option.value = key;
        option.text = key;
        attributeSelect.appendChild(option);
    }
}

// Manejo del evento de cambio en los selectores
document.getElementById('attributeSelect').addEventListener('change', function() {
    var attribute = this.value;
    var styleType = document.getElementById('styleSelect').value;

    if (styleType === 'unique') {
        applyUniqueStyle(attribute);
    } else if (styleType === 'graduated') {
        applyGraduatedStyle(attribute);
    } else if (styleType === 'naturalBreaks') {
        applyNaturalBreaksStyle(attribute);
    }
});

document.getElementById('styleSelect').addEventListener('change', function() {
    var attribute = document.getElementById('attributeSelect').value;
    var styleType = this.value;

    if (styleType === 'unique') {
        applyUniqueStyle(attribute);
    } else if (styleType === 'graduated') {
        applyGraduatedStyle(attribute);
    } else if (styleType === 'naturalBreaks') {
        applyNaturalBreaksStyle(attribute);
    }
});

// Función para generar una paleta de colores simple para valores únicos
function generateColorPalette(values) {
    var colors = {};
    var palette = ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'];
    values.forEach(function(value, index) {
        colors[value] = palette[index % palette.length];
    });
    return colors;
}

// Función para cargar una capa WMS desde una URL
function addWMSLayer(url, layerName) {
    var wmsLayer = L.tileLayer.wms(url, {
        layers: layerName,
        format: 'image/png',
        transparent: true,
        attribution: "WMS Layer"
    }).addTo(map);

    layers[layerName] = wmsLayer;
    layerControl.addOverlay(wmsLayer, 'WMS: ' + layerName);
}

// Función para cargar una capa WMTS desde una URL
function addWMTSLayer(url, layerName, tileMatrixSet) {
    var wmtsLayer = L.tileLayer(url, {
        layer: layerName,
        tileMatrixSet: tileMatrixSet,
        format: 'image/png',
        transparent: true,
        attribution: "WMTS Layer"
    }).addTo(map);

    layers[layerName] = wmtsLayer;
    layerControl.addOverlay(wmtsLayer, 'WMTS: ' + layerName);
}
