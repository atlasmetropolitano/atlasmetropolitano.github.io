document.addEventListener("DOMContentLoaded", () => {
    if (!window.map) {
        window.map = L.map('map').setView([-34.60, -58.50], 12);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(window.map);
    }
});


    const fabMain = document.getElementById("fab-main");
    const fabOptions = document.getElementById("fab-options");
    const options = document.querySelectorAll(".fab-option");
    const menus = document.querySelectorAll(".menu-box");

    let currentGeojsonLayer = null;

    if (!window.fabMain) {
        window.fabMain = document.getElementById("fab-main");
    }
    

    // Configuración para distintos GeoJSON con atributos y colores personalizados
    const geojsonConfig = {
        "nbi2022.geojson": {
            attributes: ["NOMDEN", "F__NBI"],
            colorScale: ["#fee5d9", "#fcae91", "#fb6a4a", "#de2d26", "#a50f15"],
            quantiles: 5
        },
        "Area_de_estudio.geojson": {
            color: "#3182bd",
            attributes: ["OBJECTID", "Shape_Area"]
        },
        "precipitaciones.geojson": {
            attributes: ["PROV", "DPTO", "AREA_KM2", "M1_PRECIPI"],
            colorScale: ["#edf8fb", "#b2e2e2", "#66c2a4", "#2ca25f", "#006d2c"],
            quantiles: 5
        }
    };

    fabMain.addEventListener("click", () => {
        const isExpanded = fabOptions.classList.toggle("show");
        fabMain.setAttribute("aria-expanded", isExpanded);
        menus.forEach(menu => menu.classList.remove("show"));
    });

    options.forEach(option => {
        option.addEventListener("click", function(event) {
            const menuId = this.getAttribute("data-menu");
            const menuBox = document.getElementById(menuId);
            const buttonColor = window.getComputedStyle(this).backgroundColor;
            menuBox.style.backgroundColor = buttonColor;
            menuBox.querySelector(".menu-header").style.backgroundColor = buttonColor;

            menus.forEach(menu => menu.classList.remove("show"));
            menuBox.classList.add("show");

            const rect = this.getBoundingClientRect();
            const menuWidth = menuBox.offsetWidth;
            let leftPosition = rect.right + 10;

            if (leftPosition + menuWidth > window.innerWidth) {
                leftPosition = rect.left - menuWidth - 10;
            }

            menuBox.style.top = `${rect.top + window.scrollY}px`;
            menuBox.style.left = `${leftPosition}px`;
            event.stopPropagation();
        });
    });

    document.body.addEventListener("click", () => {
        menus.forEach(menu => menu.classList.remove("show"));
    });

    window.addEventListener("resize", () => {
        menus.forEach(menu => menu.classList.remove("show"));
    });

    // Función para calcular los cuantiles
    function calculateQuantiles(values, numQuantiles) {
        values.sort((a, b) => a - b);
        let quantiles = [];
        for (let i = 1; i < numQuantiles; i++) {
            quantiles.push(values[Math.floor(values.length * (i / numQuantiles))]);
        }
        return quantiles;
    }

    // Función para crear popups dinámicos según los atributos de cada GeoJSON
    function createPopup(feature, config) {
        let popupContent = "<b>Información:</b><br>";
        config.attributes.forEach(attr => {
            popupContent += `<b>${attr}:</b> ${feature.properties[attr] || "N/A"}<br>`;
        });
        return popupContent;
    }

    // Cargar GeoJSON y ocultar el anterior
    document.querySelectorAll(".menu-box ul li a").forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const geojsonUrl = this.getAttribute("data-geojson");

            if (!geojsonUrl) {
                console.warn("No se encontró el atributo data-geojson.");
                return;
            }

            console.log("Cargando GeoJSON desde:", geojsonUrl);

            if (currentGeojsonLayer) {
                map.removeLayer(currentGeojsonLayer);
            }

            fetch(geojsonUrl)
                .then(response => response.json())
                .then(geojsonData => {
                    console.log("GeoJSON cargado correctamente:", geojsonData);

                    const config = geojsonConfig[geojsonUrl] || { color: "#000", attributes: [] };

                    if (geojsonUrl === "nbi2022.geojson" || geojsonUrl === "precipitaciones.geojson") {
                        // Obtener valores del atributo correspondiente y calcular cuantiles
                        const attribute = geojsonUrl === "nbi2022.geojson" ? "F__NBI" : "M1_PRECIPI";
                        const values = geojsonData.features.map(f => f.properties[attribute]).filter(v => v !== undefined);
                        if (values.length === 0) {
                            console.warn(`No se encontraron valores válidos de ${attribute}.`);
                            return;
                        }
                        const quantiles = calculateQuantiles(values, config.quantiles);

                        function getColor(value) {
                            if (value <= quantiles[0]) return config.colorScale[0];
                            if (value <= quantiles[1]) return config.colorScale[1];
                            if (value <= quantiles[2]) return config.colorScale[2];
                            if (value <= quantiles[3]) return config.colorScale[3];
                            return config.colorScale[4];
                        }

                        currentGeojsonLayer = L.geoJSON(geojsonData, {
                            style: feature => ({
                                color: "#000",
                                weight: 1,
                                fillColor: getColor(feature.properties[attribute]),
                                fillOpacity: 0.7
                            }),
                            onEachFeature: function(feature, layer) {
                                layer.on("mouseover", function(event) {
                                    const popupContent = createPopup(feature, config);
                                    layer.bindPopup(popupContent).openPopup();
                                });

                                layer.on("mouseout", function() {
                                    layer.closePopup();
                                });
                            }
                        }).addTo(map);
                    } else {
                        currentGeojsonLayer = L.geoJSON(geojsonData, {
                            style: { color: config.color, weight: 2 },
                            onEachFeature: function(feature, layer) {
                                layer.on("mouseover", function(event) {
                                    const popupContent = createPopup(feature, config);
                                    layer.bindPopup(popupContent).openPopup();
                                });

                                layer.on("mouseout", function() {
                                    layer.closePopup();
                                });
                            }
                        }).addTo(map);
                    }

                    map.fitBounds(currentGeojsonLayer.getBounds());
                })
                .catch(error => console.error("Error cargando el GeoJSON:", error));
        });
    });


function togglePanel() {
    var panel = document.getElementById("floatingPanel");
    panel.classList.toggle("open");
}

function selectYear(element) {
    document.querySelectorAll(".year").forEach(y => y.classList.remove("selected"));
    element.classList.add("selected");
}
