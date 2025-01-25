const sliderContainer = document.querySelector('.slider-container');  // Contenedor visible
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
let currentIndex = 5;  // Iniciar desde el slide correspondiente a 500vw
document.getElementById('prevBtn').style.opacity = '0'; 

function updateSlider() {
    if (currentIndex <= -5) {
        currentIndex = -5;
        document.getElementById('nextBtn').style.opacity = '0';
    } else if (currentIndex >= 5) {
        currentIndex = 5;
        document.getElementById('prevBtn').style.opacity = '0';  
    } else {
      document.getElementById('nextBtn').style.opacity = '1'; 
      document.getElementById('prevBtn').style.opacity = '1'; 
    }

    slider.style.transform = `translateX(${currentIndex * 100}vw)`;
}

function nextSlide() {
    currentIndex--;
    updateSlider();
}

function prevSlide() {
    currentIndex++;
    updateSlider();
}

// Event listeners para los botones de navegación
document.getElementById('nextBtn').addEventListener('click', nextSlide);
document.getElementById('prevBtn').addEventListener('click', prevSlide);

// Integración de Hammer.js para detectar gestos táctiles
const hammer = new Hammer(document.querySelector('.experiencies'));


hammer.on('swipeleft', () => {
    console.log('Swiped left');
    nextSlide();
});

hammer.on('swiperight', () => {
    console.log('Swiped right');
    prevSlide();
});