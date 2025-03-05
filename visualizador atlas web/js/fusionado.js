<script>
document.addEventListener("DOMContentLoaded", () => {
    const map = L.map('map').setView([-34.60, -58.50], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const fabMain = document.getElementById("fab-main");
    const fabOptions = document.getElementById("fab-options");
    const options = document.querySelectorAll(".fab-option");
    const menus = document.querySelectorAll(".menu-box");

    let geojsonLayer;

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

    // Evento para cargar GeoJSON y aplicar SLD al hacer clic en una opción del menú
    document.querySelectorAll(".menu-box ul li a").forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();

            const geojsonUrl = this.getAttribute("data-geojson");
            const sldUrl = this.getAttribute("data-sld");

            if (!geojsonUrl) {
                console.warn("No se encontró el atributo data-geojson.");
                return;
            }

            console.log("Cargando GeoJSON desde:", geojsonUrl);

            if (geojsonLayer) {
                map.removeLayer(geojsonLayer);
            }

            fetch(geojsonUrl)
                .then(response => response.json())
                .then(geojsonData => {
                    console.log("GeoJSON cargado correctamente:", geojsonData);

                    if (sldUrl) {
                        console.log("Cargando estilo SLD desde:", sldUrl);
                        return fetch(sldUrl)
                            .then(response => response.text())
                            .then(sldText => {
                                const parser = new DOMParser();
                                const sldXml = parser.parseFromString(sldText, "application/xml");
                                aplicarEstiloSLD(geojsonData, sldXml);
                            })
                            .catch(error => console.error("Error cargando el SLD:", error));
                    } else {
                        geojsonLayer = L.geoJSON(geojsonData, {
                            style: { color: "blue", weight: 2 }
                        }).addTo(map);
                        map.fitBounds(geojsonLayer.getBounds());
                    }
                })
                .catch(error => console.error("Error cargando el GeoJSON:", error));
        });
    });

    function aplicarEstiloSLD(geojsonData, sldXml) {
        if (!sldXml.querySelector("StyledLayerDescriptor")) {
            console.warn("El archivo SLD no es válido o está vacío.");
            return;
        }

        const rules = Array.from(sldXml.querySelectorAll("se\\:Rule, Rule"));

        console.log("Reglas encontradas en el SLD:", rules.length);

        function getFillColor(h_nbi) {
            for (let rule of rules) {
                const minNode = rule.querySelector("ogc\\:PropertyIsGreaterThanOrEqualTo ogc\\:Literal, ogc\\:PropertyIsGreaterThan ogc\\:Literal");
                const maxNode = rule.querySelector("ogc\\:PropertyIsLessThanOrEqualTo ogc\\:Literal");

                if (minNode && maxNode) {
                    const min = parseFloat(minNode.textContent);
                    const max = parseFloat(maxNode.textContent);

                    if (h_nbi >= min && h_nbi <= max) {
                        const fillNode = rule.querySelector("se\\:SvgParameter[name='fill'], SvgParameter[name='fill']");
                        if (fillNode) {
                            return fillNode.textContent.trim();
                        }
                    }
                }
            }
            return "#CCCCCC"; // Color gris si no encuentra coincidencia
        }

        geojsonLayer = L.geoJSON(geojsonData, {
            style: feature => {
                const h_nbi = feature.properties.H_NBI;
                return {
                    color: "#000000",
                    weight: 1,
                    fillColor: getFillColor(h_nbi),
                    fillOpacity: 0.7
                };
            }
        }).addTo(map);

        map.fitBounds(geojsonLayer.getBounds());
    }
});
</script>



