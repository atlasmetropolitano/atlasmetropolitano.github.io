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
var shapefileLayer;  // Variable para almacenar la capa Shapefile cargada
var layerControl = L.control.layers().addTo(map);  // Control de capas de Leaflet
var layers = {};  // Objeto para almacenar las capas cargadas

// Función para manejar la creación de popups en elementos GeoJSON
function onEachFeature(feature, layer) {
    if (feature.properties) {
        var popupContent = "<h3>Información del Elemento</h3>";
        for (var key in feature.properties) {
            popupContent += "<b>" + key + ":</b> " + feature.properties[key] + "<br>";
        }
        layer.bindPopup(popupContent);
    }
}

// Función para aplicar estilo basado en valor único con paleta de colores seleccionada por el usuario
function applyUniqueStyle(attribute, layer) {
    var uniqueValues = new Set();
    layer.eachLayer(function(layer) {
        if (layer.feature.properties[attribute]) {
            uniqueValues.add(layer.feature.properties[attribute]);
        }
    });

    var paletteSelection = document.getElementById('colorPaletteSelect').value;
    var colors;

    if (paletteSelection === 'warm') {
        colors = chroma.scale(['#ffeda0', '#feb24c', '#f03b20']).domain([0, uniqueValues.size - 1]);
    } else if (paletteSelection === 'cool') {
        colors = chroma.scale(['#edf8b1', '#7fcdbb', '#2c7fb8']).domain([0, uniqueValues.size - 1]);
    } else if (paletteSelection === 'custom') {
        colors = chroma.scale(['#e41a1c', '#377eb8', '#4daf4a']).domain([0, uniqueValues.size - 1]);
    } else {
        colors = chroma.scale(['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00']).domain([0, uniqueValues.size - 1]);
    }

    var colorMap = {};
    Array.from(uniqueValues).forEach((value, index) => {
        colorMap[value] = colors(index);
    });

    layer.eachLayer(function(layer) {
        var value = layer.feature.properties[attribute];
        if (value) {
            layer.setStyle({
                fillColor: colorMap[value],
                color: colorMap[value],
                weight: 2,
                opacity: 1,
                fillOpacity: 0.7
            });
        }
    });
}

// Función para aplicar estilo graduado
function applyGraduatedStyle(attribute, layer) {
    var values = [];
    layer.eachLayer(function(layer) {
        if (layer.feature.properties[attribute]) {
            values.push(layer.feature.properties[attribute]);
        }
    });

    var min = Math.min.apply(Math, values);
    var max = Math.max.apply(Math, values);
    var colorScale = chroma.scale(['#fafa6e', '#2A4858']).domain([min, max]);

    layer.eachLayer(function(layer) {
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
function applyNaturalBreaksStyle(attribute, layer) {
    var values = [];

    layer.eachLayer(function(layer) {
        if (layer.feature.properties[attribute]) {
            values.push(layer.feature.properties[attribute]);
        }
    });

    var breaks = ss.jenks(values, 5);  
    var colorScale = chroma.scale(['#f7fbff', '#08306b']).classes(breaks);  

    layer.eachLayer(function(layer) {
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
            updateLayerSelect(layerName);
            map.fitBounds(geojsonLayer.getBounds());

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
        shp(e.target.result).then(function(geojson) {
            shapefileLayer = L.geoJSON(geojson, {
                onEachFeature: onEachFeature
            }).addTo(map);

            layers[layerName] = shapefileLayer;
            layerControl.addOverlay(shapefileLayer, layerName);
            updateLayerSelect(layerName);
            map.fitBounds(shapefileLayer.getBounds());

            if (geojson.features.length > 0) {
                populateAttributeSelect(geojson.features[0].properties);
            }
        }).catch(function(error) {
            alert("Error al procesar el archivo SHP: " + error.message);
        });
    };
    reader.readAsArrayBuffer(file);
}

// Función para actualizar el selector de capas
function updateLayerSelect(layerName) {
    var layerSelect = document.getElementById('layerSelect');
    var option = document.createElement('option');
    option.value = layerName;
    option.text = layerName;
    layerSelect.appendChild(option);
}

// Función para poblar el select de atributos
function populateAttributeSelect(properties) {
    var attributeSelect = document.getElementById('attributeSelect');
    attributeSelect.innerHTML = '';
    for (var key in properties) {
        var option = document.createElement('option');
        option.value = key;
        option.text = key;
        attributeSelect.appendChild(option);
    }
}

// Evento para cargar las capas según el archivo seleccionado
document.getElementById('fileInput').addEventListener('change', function(event) {
    var file = event.target.files[0];
    var layerName = file.name;

    if (file.name.endsWith('.json') || file.name.endsWith('.geojson')) {
        loadJSON(file, layerName);
    } else if (file.name.endsWith('.zip') || file.name.endsWith('.shp')) {
        loadShapefile(file, layerName);
    } else {
        alert("Por favor, selecciona un archivo JSON, GeoJSON, SHP o ZIP.");
    }
});

// Evento para cambiar entre capas seleccionadas
document.getElementById('layerSelect').addEventListener('change', function() {
    var selectedLayerName = this.value;
    var selectedLayer = layers[selectedLayerName];

    // Actualizar los atributos según la capa seleccionada
    if (selectedLayer) {
        populateAttributeSelect(selectedLayer.getLayers()[0].feature.properties);
    }
});

// Evento de cambio en los selectores para aplicar estilo a la capa seleccionada
document.getElementById('attributeSelect').addEventListener('change', function() {
    var attribute = this.value;
    var selectedLayerName = document.getElementById('layerSelect').value;
    var selectedLayer = layers[selectedLayerName];
    var styleType = document.getElementById('styleSelect').value;

    if (styleType === 'unique') {
        applyUniqueStyle(attribute, selectedLayer);
    } else if (styleType === 'graduated') {
        applyGraduatedStyle(attribute, selectedLayer);
    } else if (styleType === 'naturalBreaks') {
        applyNaturalBreaksStyle(attribute, selectedLayer);
    }
});

document.getElementById('styleSelect').addEventListener('change', function() {
    var attribute = document.getElementById('attributeSelect').value;
    var selectedLayerName = document.getElementById('layerSelect').value;
    var selectedLayer = layers[selectedLayerName];
    var styleType = this.value;

    if (styleType === 'unique') {
        applyUniqueStyle(attribute, selectedLayer);
    } else if (styleType === 'graduated') {
        applyGraduatedStyle(attribute, selectedLayer);
    } else if (styleType === 'naturalBreaks') {
        applyNaturalBreaksStyle(attribute, selectedLayer);
    }
});

// Evento de cambio para la paleta de colores
document.getElementById('colorPaletteSelect').addEventListener('change', function() {
    var attribute = document.getElementById('attributeSelect').value;
    var selectedLayerName = document.getElementById('layerSelect').value;
    var selectedLayer = layers[selectedLayerName];
    applyUniqueStyle(attribute, selectedLayer);  // Aplicar el estilo único al cambiar la paleta
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

// Función para cargar las capas disponibles en un servicio WMS usando GetCapabilities
function loadWmsLayers(url) {
    var capabilitiesUrl = url + '?service=WMS&request=GetCapabilities';

    fetch(capabilitiesUrl)
        .then(response => response.text())
        .then(text => {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(text, "text/xml");

            var layers = xmlDoc.getElementsByTagName("Layer");
            var wmsLayerList = document.getElementById('wmsLayerList');
            wmsLayerList.innerHTML = '';

            for (var i = 0; i < layers.length; i++) {
                var layerName = layers[i].getElementsByTagName("Name")[0].textContent;
                var option = document.createElement('option');
                option.value = layerName;
                option.textContent = layerName;
                wmsLayerList.appendChild(option);
            }
        })
        .catch(error => {
            alert("Error al obtener las capas WMS: " + error);
        });
}

// Función para agregar una capa WMS seleccionada desde la lista
function addWMSLayerFromList() {
    var wmsUrl = document.getElementById('wmsUrl').value;
    var selectedLayerName = document.getElementById('wmsLayerList').value;

    if (wmsUrl && selectedLayerName) {
        addWMSLayer(wmsUrl, selectedLayerName);
    } else {
        alert("Por favor, selecciona una capa WMS.");
    }
}

// Función para agregar una capa WMS desde una URL con icono personalizado
function addWMSLayer(url, layerName) {
    var wmsLayer = L.tileLayer.wms(url, {
        layers: layerName,
        format: 'image/png',
        transparent: true,
        attribution: "WMS Layer"
    }).addTo(map);

    layers[layerName] = wmsLayer;

    layerControl.addOverlay(wmsLayer, `<img src="img/wms_icon.png" width="16" height="16"> WMS: ${layerName}`);
}

// Función para agregar la capa WMS seleccionada
document.getElementById('addWmsLayerBtn').addEventListener('click', function() {
    addWMSLayerFromList();
});

// Evento para cargar las capas WMS al hacer clic en el botón "Cargar capas WMS"
document.getElementById('loadWmsLayersBtn').addEventListener('click', function() {
    var wmsUrl = document.getElementById('wmsUrl').value;
    if (wmsUrl) {
        loadWmsLayers(wmsUrl);
    } else {
        alert("Por favor, introduce la URL del servicio WMS.");
    }
});

// Función para cargar una capa WMTS desde una URL con icono personalizado
function addWMTSLayer(url, layerName, tileMatrixSet) {
    var wmtsLayer = L.tileLayer(url, {
        layer: layerName,
        tileMatrixSet: tileMatrixSet,
        format: 'image/png',
        transparent: true,
        attribution: "WMTS Layer"
    }).addTo(map);

    layers[layerName] = wmtsLayer;

    layerControl.addOverlay(wmtsLayer, `<img src="img/wmts_icon.png" width="16" height="16"> WMTS: ${layerName}`);
}

// Función para agregar la capa WMTS desde la URL proporcionada
document.getElementById('addWmtsLayerBtn').addEventListener('click', function() {
    var wmtsUrl = document.getElementById('wmtsUrl').value;
    var wmtsLayerName = document.getElementById('wmtsLayerName').value;

    if (wmtsUrl && wmtsLayerName) {
        addWMTSLayer(wmtsUrl, wmtsLayerName, 'default');
    } else {
        alert("Por favor, introduce tanto la URL como el nombre de la capa WMTS.");
    }
});

/* Funcionalidades de las herramientas flotantes */

// Desplazar el mapa (Herramienta Pan)
document.getElementById('panTool').addEventListener('click', function() {
    map.dragging.enable(); // Habilitar el desplazamiento del mapa
    map.getContainer().style.cursor = 'grab';
});

// Mostrar información al hacer clic en el mapa (Herramienta Info)
document.getElementById('infoTool').addEventListener('click', function() {
    map.on('click', function(e) {
        var latlng = e.latlng;
        L.popup()
            .setLatLng(latlng)
            .setContent("Coordenadas: " + latlng.toString())
            .openOn(map);
    });
});

// Herramienta de Medición
document.getElementById('measureTool').addEventListener('click', function() {
    alert('Funcionalidad de medición activada.'); // Aquí podrías integrar una librería como Leaflet-measure
});

// Cambiar transparencia (Herramienta Transparencia)
document.getElementById('transparencyTool').addEventListener('click', function() {
    if (geojsonLayer) {
        geojsonLayer.setStyle({
            opacity: 0.5,
            fillOpacity: 0.5
        });
    }
});

// Función para manejar la creación de popups en elementos GeoJSON
function onEachFeature(feature, layer) {
    if (feature.properties) {
        var popupContent = "<h3>Información del Elemento</h3>";
        for (var key in feature.properties) {
            popupContent += "<b>" + key + ":</b> " + feature.properties[key] + "<br>";
        }
        layer.bindPopup(popupContent);
    }
}

// Función para cargar capas iniciales al abrir el mapa con estilos personalizados
function loadInitialGeoJSON(url, layerName, styleFunction) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP ${response.status}: No se pudo cargar el archivo.`);
            }
            return response.json();
        })
        .then(data => {
            var geojsonLayer = L.geoJSON(data, {
                style: styleFunction,  // Aplicar el estilo personalizado
                onEachFeature: onEachFeature
            }).addTo(map);

            layers[layerName] = geojsonLayer;
            layerControl.addOverlay(geojsonLayer, layerName);
            map.fitBounds(geojsonLayer.getBounds());
        })
        .catch(error => {
            console.error("Error al cargar el archivo GeoJSON:", error.message);
            alert(`Error al cargar el archivo GeoJSON: ${error.message}`);
        });
}

// Estilo personalizado para la capa mapabase.geojson (sin relleno, línea más fina)
function mapabaseStyle() {
    return {
        color: '#000000',    // Color de la línea (negro)
        weight: 1,           // Grosor de la línea
        fillOpacity: 0,      // Sin relleno
        opacity: 1           // Opacidad de la línea
    };
}

// Estilo personalizado para la capa limiteint.geojson (línea más fina)
function limiteintStyle() {
    return {
        color: '#ff0000',    // Color de la línea (rojo o ajusta según tu preferencia)
        weight: 1,           // Grosor de la línea
        fillOpacity: 0,      // Sin relleno
        opacity: 1           // Opacidad de la línea
    };
}

// Cargar automáticamente capas GeoJSON al iniciar el mapa con estilos personalizados
function loadInitialLayers() {
    loadInitialGeoJSON('../data/limiteint.geojson', 'Capa 1', limiteintStyle);  // Subir un nivel y acceder a data/
    loadInitialGeoJSON('../data/mapabase.geojson', 'Capa 2', mapabaseStyle);   // Subir un nivel y acceder a data/
    //loadInitialGeoJSON('data/redferro.geojson', 'Capa 3');  // Cargar redferro.geojson sin estilo personalizado
}

// Llamar a la función para cargar capas iniciales
loadInitialLayers();
