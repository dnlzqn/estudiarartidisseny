// Testimonis 

// 1. Basic object for our stuff
window.slider = {};

// 2. Define our variables
slider.container = document.querySelector('.slider');
slider.containerWidth = slider.container.offsetWidth;
slider.slides = document.querySelectorAll('.slider__item');
slider.slidesWrapper = document.querySelector('.slides');
slider.sliderCounter = slider.slides.length;
slider.currentSlide = slider.slides[0];
slider.dots = document.querySelectorAll('.dots__dot');
slider.currentDot = slider.dots[0];
slider.num = 0;
slider.paneWidth = (slider.sliderCounter * slider.containerWidth) / slider.sliderCounter;
slider.slidesWrapper.style.width = slider.sliderCounter * slider.containerWidth + 'px';

// 3. Animate slides
slider.moveSlide = function(ev) {
  slider.currentSlide.classList.remove('slider__item--current');
  slider.currentDot.classList.remove('dots__dot--current');
  
  slider.currentSlide = slider.slides[slider.num];
  slider.currentDot = slider.dots[slider.num];
  
  slider.currentSlide.classList.add('slider__item--current');
  slider.currentDot.classList.add('dots__dot--current');
  
  slider.slidesWrapper.classList.add('is-animating');
  clearTimeout(slider.timer);
  slider.timer = setTimeout(function() {
    slider.slidesWrapper.classList.remove('is-animating');
  }, 400);
  
  slider.animate = (slider.containerWidth * slider.num * -1) + 'px';
  slider.slidesWrapper.style.left = slider.animate;
  slider.slidesWrapper.style.transform = '';
}

// 4. Move to next slide
slider.nextItem = function() {
  slider.num++;
  slider.num = slider.num % slider.sliderCounter;
  
  slider.moveSlide(slider.slides[slider.num]);
}

// 5. Move to previous slide
slider.prevItem = function() {
  if (slider.num === 0) {
    slider.num = slider.sliderCounter;
  }
  
  slider.num--;
  
  slider.moveSlide(slider.slides[slider.num]);
}

// 6. Move to correct slide when clicking the dots
slider.dotsClick = function(el) {
  el = el.target;
  
  for (var i = 0; i < slider.dots.length; i++) {
    if (slider.dots[i] === el) {
      slider.num = i;
    }
  }
  
  slider.moveSlide(slider.num);
}

// 7. Pan slides using Hammer.js
slider.panSlide = function() {
  
  var hammer = new Hammer.Manager(slider.slidesWrapper);


  
  hammer.add( new Hammer.Pan({ threshold: 0, pointers: 0 }) );

  
  hammer.on('pan', function(e) {
    slider.currentPane = Math.max(0, Math.min(slider.num, slider.sliderCounter - 1));
    
    var ContainerOffsetX = -slider.currentPane * slider.paneWidth + e.deltaX;
    
    slider.slidesWrapper.style.left = ContainerOffsetX + 'px';
  });
  
  hammer.on('panend', function(e) {
    if (e.deltaX > 1) {
      slider.goTo(slider.num - 1);
    } else if (e.deltaX < -1) {
      slider.goTo(slider.num + 1)
    } else {
      slider.goTo(slider.num);
    }
    
    slider.currentSlide = slider.slides[slider.num];
    slider.currentDot = slider.dots[slider.num];
  });
}

slider.goTo = function(number) {
  if (number < 0) {
    slider.num = 0;
  } else if (number > slider.sliderCounter - 1) {
    slider.num = slider.sliderCounter - 1;
  } else {
    slider.num = number;
  }
  
  slider.currentPane = Math.max(0, Math.min(slider.num, slider.sliderCounter - 1));
  
  var ContainerOffsetX = -slider.currentPane * slider.paneWidth;
  
  slider.slidesWrapper.style.left = ContainerOffsetX + 'px';
  
  slider.slidesWrapper.classList.add('is-animating');
  clearTimeout(slider.timer);
  slider.timer = setTimeout(function() {
    slider.slidesWrapper.classList.remove('is-animating');
  }, 400);

  for (var i = 0; i < slider.sliderCounter; i++) {
    i === slider.num ? 
    slider.slides[i].classList.add('slider__item--current') : 
    slider.slides[i].classList.remove('slider__item--current');
  }
  
  for (var n = 0; n < slider.dots.length; n++) {
    n === slider.num ? 
    slider.dots[n].classList.add('dots__dot--current') : 
    slider.dots[n].classList.remove('dots__dot--current');
  }
};

// 8. Add listeners

for (var i = 0; i < slider.dots.length; i++) {
  slider.dots[i].addEventListener('click', slider.dotsClick);
}

slider.panSlide();



// Función para avanzar al siguiente slide automáticamente
function avanzarAutomaticamente() {
  setInterval(function() {
    slider.nextItem();
  }, 30000); // Avanza cada 30 segundos (30000 milisegundos)
}

// Llama a la función para iniciar el avance automático del slider
avanzarAutomaticamente();
