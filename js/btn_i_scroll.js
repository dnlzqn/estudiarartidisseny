document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu');
    const menu = document.querySelector('.menu');
    const buttons = document.querySelectorAll('.menu button');

    menuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
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
});
