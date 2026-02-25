document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu');
    const menu = document.querySelector('.menu');
    const buttons = document.querySelectorAll('.menu button');
    const accordions = document.querySelectorAll(".accordion input[type='checkbox']");

    menuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        menu.style.display = (menu.style.display === 'flex') ? 'none' : 'flex';
    });

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            menu.style.display = 'none';
        });
    });

    buttons.forEach(button => {
        button.addEventListener('mouseover', () => button.classList.add('hover'));
        button.addEventListener('mouseout', () => button.classList.remove('hover'));
        button.addEventListener('mousedown', () => button.classList.add('active'));
        button.addEventListener('mouseup', () => button.classList.remove('active'));
    });

    accordions.forEach((accordion) => {
      accordion.addEventListener("change", function () {
        if (!this.checked) {
          const y = window.scrollY;
          requestAnimationFrame(() => {
            window.scrollTo(0, y);
          });
        }
      });
    });

    
});
