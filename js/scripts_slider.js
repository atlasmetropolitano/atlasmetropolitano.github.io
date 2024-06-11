// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    // Alterna el menú en dispositivos móviles
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    menuToggle.addEventListener('click', function() {
        menu.classList.toggle('active');
    });

    // Alterna los submenús
    const subMenus = document.querySelectorAll('nav ul.menu > li > a');
    subMenus.forEach(menuItem => {
        menuItem.addEventListener('click', function(e) {
            const submenu = this.nextElementSibling;
            if (submenu && submenu.classList.contains('submenu')) {
                e.preventDefault();
                submenu.classList.toggle('active');
            }
        });
    });

    // Alterna los sub-submenús
    const subSubMenus = document.querySelectorAll('nav ul.submenu > li > a');
    subSubMenus.forEach(menuItem => {
        menuItem.addEventListener('click', function(e) {
            const subsubmenu = this.nextElementSibling;
            if (subsubmenu && subsubmenu.classList.contains('subsubmenu')) {
                e.preventDefault();
                subsubmenu.classList.toggle('active');
            }
        });
    });

    // Inicializa el slider Swiper
    const swiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: {
            delay: 2000, // Intervalo de 2 segundos entre slides
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next', // Botón de siguiente slide
            prevEl: '.swiper-button-prev', // Botón de slide anterior
        },
        pagination: {
            el: '.swiper-pagination', // Paginación (puntos)
            clickable: true, // Hacer que los puntos sean clicables
        },
        slidesPerView: 3, // Número de slides visibles por cuadro
        spaceBetween: 10, // Espacio entre las slides
        breakpoints: {
            640: {
                slidesPerView: 1, // 1 slide visible en pantallas pequeñas
                spaceBetween: 10
            },
            768: {
                slidesPerView: 2, // 2 slides visibles en pantallas medianas
                spaceBetween: 10
            },
            1024: {
                slidesPerView: 3, // 3 slides visibles en pantallas grandes
                spaceBetween: 10
            }
        }
    });
});


