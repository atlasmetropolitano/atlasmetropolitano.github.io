// Función para mostrar el pop-up
function showPopup() {
    if (!localStorage.getItem('termsAccepted')) { // Verifica si el usuario ya aceptó los términos
        document.getElementById('popup').style.display = 'flex';
    }
}

// Función para ocultar el pop-up
function hidePopup() {
    document.getElementById('popup').style.display = 'none';
}

// Bloquea la descarga hasta aceptar términos
document.querySelectorAll('.download-buttons button').forEach(button => {
    button.addEventListener('click', function(event) {
        if (!localStorage.getItem('termsAccepted')) { // Verifica si el usuario ya aceptó los términos
            event.preventDefault(); // Previene la descarga inmediata
            showPopup(); // Muestra el pop-up
        } else {
            alert('Descargando archivo...');
            // Aquí puedes agregar la lógica de descarga si es necesario
        }
    });
});

// Lógica para aceptar o rechazar los términos
document.getElementById('accept-btn').addEventListener('click', function() {
    localStorage.setItem('termsAccepted', true); // Guarda que el usuario aceptó los términos
    hidePopup(); // Oculta el pop-up
    alert('Ahora puedes proceder a la descarga.'); // Mensaje de confirmación
    // Aquí puedes gestionar la lógica de descarga real, si es necesario
});

document.getElementById('reject-btn').addEventListener('click', function() {
    hidePopup(); // Oculta el pop-up
    alert('No aceptaste los términos, no podrás descargar el archivo.');
});
