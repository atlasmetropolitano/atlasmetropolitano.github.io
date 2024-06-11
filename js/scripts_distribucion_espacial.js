document.addEventListener('DOMContentLoaded', () => {
    const yearButtons = document.querySelectorAll('.year-btn');
    const mapFrame = document.getElementById('map-frame');
    const yearText = document.getElementById('year-text');

    yearButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover clase 'active' de todos los botones
            yearButtons.forEach(btn => btn.classList.remove('active'));
            // Añadir clase 'active' al botón clicado
            button.classList.add('active');

            // Cambiar el texto del año
            const selectedYear = button.getAttribute('data-year');
            yearText.textContent = selectedYear;

            // Cambiar la fuente del iframe del mapa según el año seleccionado
            mapFrame.src = `${selectedYear}/${selectedYear}.html`;
        });
    });
});

