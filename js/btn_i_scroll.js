const buttons = document.querySelectorAll('button');

buttons.forEach(function(button) {
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

