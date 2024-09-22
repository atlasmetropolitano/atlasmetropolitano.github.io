document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.button-group button').forEach(button => {
        button.addEventListener('click', () => {
            const sectionId = button.getAttribute('data-section');

            // Ocultar todas las secciones
            document.querySelectorAll('.section-content').forEach(section => {
                section.classList.remove('active');
            });

            // Mostrar la sección correspondiente al botón clicado
            document.getElementById(sectionId).classList.add('active');
        });
    });
});
