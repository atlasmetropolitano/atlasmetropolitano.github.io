document.addEventListener("DOMContentLoaded", function() {
    const floatingMenuToggle = document.querySelector('.floating-menu-toggle');
    const floatingMenu = document.querySelector('.floating-menu');
    const floatingSubmenu = document.querySelector('.floating-submenu');

    floatingMenuToggle.addEventListener('click', function() {
        floatingSubmenu.style.display = floatingSubmenu.style.display === 'block' ? 'none' : 'block';
        floatingMenu.classList.toggle('open');
    });

    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        floatingMenu.style.top = `${scrollTop + window.innerHeight / 2}px`; /* Ajusta según la altura del header */
    });

    
        
});





