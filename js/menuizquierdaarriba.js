console.log("✅ menuizquierdaarriba.js se ha cargado correctamente.");

console.log("🔍 Verificando si los botones del menú existen...");
console.log("Zoom In:", document.getElementById("btn-zoom-in"));
console.log("Zoom Out:", document.getElementById("btn-zoom-out"));
console.log("Restablecer:", document.getElementById("btn-reset"));
console.log("Alternar Capa:", document.getElementById("btn-toggle-layer"));


document.addEventListener("DOMContentLoaded", () => {
    const toolbox = document.querySelector(".toolbox");
    const toggleToolboxBtn = document.getElementById("toggle-toolbox");

    if (toggleToolboxBtn) {
        toggleToolboxBtn.addEventListener("click", () => {
            toolbox.classList.toggle("hidden"); // Alternar visibilidad del menú
            toggleToolboxBtn.classList.toggle("active"); // Cambiar estado del botón

            // 📌 Ajustar la posición cuando está visible o no
            if (toolbox.classList.contains("hidden")) {
                toolbox.style.left = "60px"; // Se oculta moviéndolo hacia la izquierda
            } else {
                toolbox.style.left = "50px"; // Se despliega hacia la derecha
            }
        });
    }
});



document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 menuizquierdaarriba.js inicializado correctamente.");

    const map = window.map;

    // 📌 Verificar que los botones existen antes de asignar eventos
    const zoomInBtn = document.getElementById("btn-zoom-in");
    const zoomOutBtn = document.getElementById("btn-zoom-out");
    const resetBtn = document.getElementById("btn-reset");
    const toggleLayerBtn = document.getElementById("btn-toggle-layer");
    const printMapBtn = document.getElementById("btn-print-map");
    const screenshotMapBtn = document.getElementById("btn-screenshot-map");

// 🖨 Función para imprimir el mapa
if (printMapBtn) {
    printMapBtn.addEventListener("click", () => {
        console.log("🖨 Preparando impresión del mapa...");

        // Ocultar elementos innecesarios antes de la impresión
        const elementsToHide = document.querySelectorAll(
            ".toolbox, .fab-container, .menu-box, .panel, #wms-info-box"
        );

        elementsToHide.forEach(el => el.style.display = "none");

        // Ajustar el mapa para que ocupe toda la página
        const mapElement = document.getElementById("map");
        const originalPosition = mapElement.style.position;
        const originalZIndex = mapElement.style.zIndex;

        mapElement.style.position = "absolute";
        mapElement.style.zIndex = "9999";
        mapElement.style.width = "100%";
        mapElement.style.height = "100vh";

        // Esperar un pequeño tiempo antes de imprimir para que los estilos se apliquen
        setTimeout(() => {
            window.print();

            // Restaurar elementos después de la impresión
            elementsToHide.forEach(el => el.style.display = "");
            mapElement.style.position = originalPosition;
            mapElement.style.zIndex = originalZIndex;
            mapElement.style.width = "";
            mapElement.style.height = "";
        }, 500);
    });
} else {
    console.error("❌ Error: No se encontró el botón 'btn-print-map'.");
}

if (screenshotMapBtn) {
    screenshotMapBtn.addEventListener("click", () => {
        console.log("📸 Capturando el mapa...");

        // Asegurar que el mapa y todas sus capas sean capturadas
        const mapElement = document.getElementById("map");

        // 🔹 Ajustar temporalmente la visibilidad del mapa para asegurar una captura completa
        mapElement.style.width = "100%";
        mapElement.style.height = "100vh";

        html2canvas(mapElement, {
            useCORS: true, // Permite capturar mapas externos como OpenStreetMap
            allowTaint: true,
            logging: true,
            scale: 2 // Captura de alta calidad
        }).then(canvas => {
            let link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = "captura_mapa.png";
            link.click();
            console.log("✅ Captura guardada correctamente.");

            // 🔹 Restaurar el tamaño original después de la captura
            mapElement.style.width = "";
            mapElement.style.height = "";
        }).catch(err => {
            console.error("❌ Error al capturar el mapa:", err);
        });
    });
} else {
    console.error("❌ Error: No se encontró el botón 'btn-screenshot-map'.");
}

const downloadGeojsonBtn = document.getElementById("btn-download-geojson");

// 📂 Función para descargar el GeoJSON activo con su nombre original
if (downloadGeojsonBtn) {
    downloadGeojsonBtn.addEventListener("click", () => {
        console.log("📂 Buscando capas GeoJSON activas para descargar...");

        let geojsonLayers = [];
        let layerNames = [];

        window.map.eachLayer(layer => {
            if (layer instanceof L.GeoJSON) {
                geojsonLayers.push(layer);
                
                // Intentar obtener el nombre original del archivo
                if (layer.options && layer.options.geojsonName) {
                    layerNames.push(layer.options.geojsonName);
                } else {
                    layerNames.push(`capa_${geojsonLayers.length}.geojson`);
                }
            }
        });

        if (geojsonLayers.length === 0) {
            alert("⚠️ No hay capas GeoJSON visibles para descargar.");
            return;
        }

        // Si hay más de una capa, preguntar cuál descargar
        if (geojsonLayers.length === 1) {
            downloadGeoJSONFile(geojsonLayers[0], layerNames[0]);
        } else {
            let options = geojsonLayers.map((_, index) => `(${index + 1}) ${layerNames[index]}`).join("\n");
            let choice = prompt(`Hay varias capas GeoJSON activas. Elige cuál descargar:\n${options}`);

            let choiceIndex = parseInt(choice) - 1;
            if (isNaN(choiceIndex) || choiceIndex < 0 || choiceIndex >= geojsonLayers.length) {
                alert("⚠️ Opción inválida. No se descargó ningún archivo.");
                return;
            }

            downloadGeoJSONFile(geojsonLayers[choiceIndex], layerNames[choiceIndex]);
        }
    });
} else {
    console.error("❌ Error: No se encontró el botón 'btn-download-geojson'.");
}

// 📂 Función auxiliar para convertir una capa en GeoJSON y descargarla
function downloadGeoJSONFile(layer, filename) {
    const geojsonData = layer.toGeoJSON();
    const geojsonStr = JSON.stringify(geojsonData, null, 2);
    const blob = new Blob([geojsonStr], { type: "application/json" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log(`✅ GeoJSON descargado: ${filename}`);
}

    if (zoomInBtn) {
        zoomInBtn.addEventListener("click", () => {
            map.zoomIn();
            console.log("🔍 Zoom In aplicado.");
        });
    } else {
        console.error("❌ Error: No se encontró el botón 'btn-zoom-in'.");
    }

    if (zoomOutBtn) {
        zoomOutBtn.addEventListener("click", () => {
            map.zoomOut();
            console.log("🔍 Zoom Out aplicado.");
        });
    } else {
        console.error("❌ Error: No se encontró el botón 'btn-zoom-out'.");
    }

    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            map.setView([-34.60, -58.50], 12);
            console.log("🏠 Vista Restablecida.");
        });
    } else {
        console.error("❌ Error: No se encontró el botón 'btn-reset'.");
    }

    if (toggleLayerBtn) {
        let isLayerVisible = true;
        toggleLayerBtn.addEventListener("click", () => {
            if (window.lastLayer) {
                if (isLayerVisible) {
                    map.removeLayer(window.lastLayer);
                    isLayerVisible = false;
                } else {
                    window.lastLayer.addTo(map);
                    isLayerVisible = true;
                }
            } else {
                console.warn("⚠️ No hay capas activas para alternar.");
            }
        });
    } else {
        console.error("❌ Error: No se encontró el botón 'btn-toggle-layer'.");
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const map = window.map;

    // 📌 Botón para subir y cargar un GeoJSON externo (No modificar esta parte)
    document.getElementById("btn-upload-geojson").addEventListener("click", () => {
        document.getElementById("geojson-input").click();
    });

    document.getElementById("geojson-input").addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            const geojsonData = JSON.parse(e.target.result);
            
            // ✅ Remover cualquier capa anterior
            if (window.externalGeojsonLayer) {
                map.removeLayer(window.externalGeojsonLayer);
            }

            // ✅ Crear capa con popup para ver atributos
            window.externalGeojsonLayer = L.geoJSON(geojsonData, {
                onEachFeature: function(feature, layer) {
                    let popupContent = "<b>Atributos:</b><br>";
                    Object.entries(feature.properties).forEach(([key, value]) => {
                        popupContent += `<b>${key}:</b> ${value}<br>`;
                    });
                    layer.bindPopup(popupContent);
                }
            }).addTo(map);

            map.fitBounds(window.externalGeojsonLayer.getBounds());
        };

        reader.readAsText(file);
    });

    // 📌 Botón para cargar un servicio WMS
    document.getElementById("btn-load-wms").addEventListener("click", () => {
        const wmsUrl = prompt("Ingrese la URL del servicio WMS:");
        if (!wmsUrl) return;
    
        console.log("🔍 Obteniendo capas disponibles del servicio WMS...");
    
        fetch(`${wmsUrl}?service=WMS&request=GetCapabilities&version=1.3.0`, { mode: "cors" })
            .then(response => response.text())
            .then(text => {
                const parser = new DOMParser();
                const xml = parser.parseFromString(text, "text/xml");
    
                const layers = Array.from(xml.getElementsByTagName("Layer"))
                    .map(layer => {
                        const name = layer.getElementsByTagName("Name")[0]?.textContent;
                        const title = layer.getElementsByTagName("Title")[0]?.textContent || name;
                        return { name, title };
                    })
                    .filter(layer => layer.name);
    
                if (layers.length === 0) {
                    alert("⚠️ No se encontraron capas en este servicio WMS.");
                    return;
                }
    
                console.log("✅ Capas encontradas:", layers);
    
                let selectHTML = `<label for="wms-layer-select">Selecciona una capa:</label>
                                  <select id="wms-layer-select">
                                    ${layers.map(layer => `<option value="${layer.name}">${layer.title}</option>`).join("")}
                                  </select>
                                  <button id="btn-add-wms-layer">Cargar Capa</button>`;
    
                document.getElementById("wms-data").innerHTML = selectHTML;
                
                // 📌 Asegurar visibilidad del cuadro flotante
                document.getElementById("wms-info-box").classList.remove("hidden");
                document.getElementById("wms-info-box").classList.add("show");
    
                document.getElementById("btn-add-wms-layer").addEventListener("click", () => {
                    const selectedLayer = document.getElementById("wms-layer-select").value;
                    if (!selectedLayer) return;
    
                    console.log(`🗺️ Cargando capa WMS: ${selectedLayer}`);
    
                    if (window.wmsLayer) {
                        map.removeLayer(window.wmsLayer);
                    }
    
                    window.wmsLayer = L.tileLayer.wms(wmsUrl, {
                        layers: selectedLayer,
                        format: "image/png",
                        transparent: true
                    }).addTo(map);
                });
    
            })
            .catch(error => {
                console.error("🚨 Error al obtener capas WMS:", error);
                alert("⚠️ Error al obtener capas WMS. Verifique la URL.");
            });
    });
    
    document.getElementById("close-wms").addEventListener("click", () => {
        document.getElementById("wms-info-box").classList.add("hidden");
        document.getElementById("wms-info-box").classList.remove("show");
        if (window.wmsLayer) {
            map.removeLayer(window.wmsLayer);
        }
    });



    
});
// Función para hacer un elemento arrastrable
function makeDraggable(el) {
    let isMouseDown = false;
    let offsetX = 0, offsetY = 0;

    // Asegurarse de que el elemento tenga posición fija
    el.style.position = "fixed";
    el.style.cursor = "move";

    el.addEventListener("mousedown", function(e) {
        isMouseDown = true;
        // Quitar transformaciones previas
        el.style.transform = "";
        const rect = el.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
    });

    document.addEventListener("mousemove", function(e) {
        if (isMouseDown) {
            el.style.left = (e.clientX - offsetX) + "px";
            el.style.top = (e.clientY - offsetY) + "px";
        }
    });

    document.addEventListener("mouseup", function() {
        isMouseDown = false;
    });
}

// Asegurarse de que el DOM esté cargado antes de aplicar el draggable
document.addEventListener("DOMContentLoaded", () => {
    const wmsInfoBox = document.getElementById("wms-info-box");
    if (wmsInfoBox) {
        makeDraggable(wmsInfoBox);
        console.log("✅ El cuadro WMS ahora es arrastrable.");
    } else {
        console.warn("⚠️ No se encontró el elemento 'wms-info-box'.");
    }
});
