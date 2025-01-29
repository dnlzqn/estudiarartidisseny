document.addEventListener('DOMContentLoaded', function () {
    const banner = document.querySelector('.cookies');
    const acceptButton = document.getElementById('acceptCookies');
    const rejectButton = document.getElementById('rejectCookies');
    const analyticsSwitch = document.getElementById('analyticsSwitch');
    const analyticsLabel = document.getElementById('analyticsLabel');

    // Funciones para gestionar cookies
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = `${name}=${value}${expires}; path=/`;
    }

    function getCookie(name) {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? match[2] : null;
    }

    function deleteAnalyticsCookies() {
      document.cookie = '_ga=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.dnlzqn.github.io;';
      document.cookie = '_ga_QN34FFRZ06=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.dnlzqn.github.io;';
    }

    // Cargar Google Analytics
    function loadGoogleAnalytics() {
        if (!document.getElementById('ga-script')) {
            const script = document.createElement('script');
            script.id = 'ga-script';
            script.async = true;
            script.src = 'https://www.googletagmanager.com/gtag/js?id=G-QN34FFRZ06';
            document.body.appendChild(script);

            script.onload = function () {
                window.dataLayer = window.dataLayer || [];
                function gtag() { dataLayer.push(arguments); }
                gtag('js', new Date());
                gtag('config', 'G-QN34FFRZ06');
            };
        }
    }

    // Descargar Google Analytics
    function unloadGoogleAnalytics() {
        const script = document.getElementById('ga-script');
        if (script) {
            script.remove();
        }
        window.dataLayer = [];
    }

    // Actualizar el texto del switch
    function updateLabel() {
        analyticsLabel.textContent = analyticsSwitch.checked ? "Cookie acceptada" : "Cookie rebutjada";
    }

    // Inicializar estado
    function initializePreferences() {
        const cookiesAccepted = getCookie('cookiesAccepted');
        if (cookiesAccepted === 'true') {
            banner.style.display = 'none';
            analyticsSwitch.checked = true;
            loadGoogleAnalytics();
        } else if (cookiesAccepted === 'false') {
            banner.style.display = 'none';
            analyticsSwitch.checked = false;
            unloadGoogleAnalytics();
            deleteAnalyticsCookies();
        } else {
            banner.style.display = 'block';
        }
        updateLabel();
    }

    // Eventos de los botones del banner
    acceptButton.addEventListener('click', function () {
        setCookie('cookiesAccepted', 'true', 365);
        banner.style.display = 'none';
        loadGoogleAnalytics();
        analyticsSwitch.checked = true;
        updateLabel();
    });

    rejectButton.addEventListener('click', function () {
        setCookie('cookiesAccepted', 'false', 365);
        banner.style.display = 'none';
        unloadGoogleAnalytics();
        deleteAnalyticsCookies();
        analyticsSwitch.checked = false;
        updateLabel();
    });

    // Evento del switch
    analyticsSwitch.addEventListener('change', function () {
        if (analyticsSwitch.checked) {
            setCookie('cookiesAccepted', 'true', 365);
            loadGoogleAnalytics();
        } else {
            setCookie('cookiesAccepted', 'false', 365);
            unloadGoogleAnalytics();
            deleteAnalyticsCookies();
        }
        updateLabel();
    });

    // Inicializar todo al cargar
    initializePreferences();
});
