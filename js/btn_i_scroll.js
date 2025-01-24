const buttons = document.querySelectorAll('.menu button');
const menu = document.querySelector('.menu');

// Función para deshabilitar el scroll cuando el menú está stickeado en top: 0, pero solo si no hay ancla
function checkStickyMenu() {
    if (menu.getBoundingClientRect().top === 0 && !document.body.classList.contains('scroll-enabled')) {
        document.body.style.overflow = 'hidden';  // Deshabilitar scroll solo si no hay ancla
    }
}

// Detectar el evento de scroll y verificar la posición del menú
window.addEventListener('scroll', checkStickyMenu);

// Verificar si la página tiene un ancla al cargar y permitir el scroll
document.addEventListener('DOMContentLoaded', function () {
    if (window.location.hash) {
        document.body.style.overflow = 'auto';
        document.body.classList.add('scroll-enabled');
        
        // Desplazar suavemente hasta el ancla correspondiente
        const target = document.querySelector(window.location.hash);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    } else {
        checkStickyMenu();  // Si no hay ancla, comprobar el menú
    }
});

// Habilitar el scroll cuando se hace clic en un botón dentro de .menu
buttons.forEach(function(button) {
    button.addEventListener('click', function() {
        // Habilitar scroll al hacer clic en un botón
        document.body.style.overflow = 'auto';
        document.body.classList.add('scroll-enabled');

        // Desplazar suavemente hasta el ancla correspondiente
        const targetId = button.getAttribute('href');
        if (targetId && document.querySelector(targetId)) {
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });

    // Efectos visuales de los botones
    button.addEventListener('mouseover', function() {
        button.classList.add('hover');
    });
    button.addEventListener('mouseout', function() {
        button.classList.remove('hover');
    });
    button.addEventListener('mousedown', function() {
        button.classList.add('active');
    });
    button.addEventListener('mouseup', function() {
        button.classList.remove('active');
    });
});

// Agregar compatibilidad de scroll suave para navegadores antiguos
if (!('scrollBehavior' in document.documentElement.style)) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}
