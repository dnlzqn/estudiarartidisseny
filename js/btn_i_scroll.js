document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu');
    const menu = document.querySelector('.menu');
    const menu_btn = document.querySelector('.menu_btn');
    const buttons = document.querySelectorAll('.menu button');
    const accordions = document.querySelectorAll(".accordion input[type='checkbox']");

    let abierto = false;

menuToggle.addEventListener('click', (e) => {
    e.preventDefault();

    abierto = !abierto;

    menu.style.display = abierto ? 'flex' : 'none';
    menu_btn.textContent = abierto ? '✕' : 'MENÚ';
});

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            menu.style.display = 'none';
            menu_btn.textContent = 'MENÚ';
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
