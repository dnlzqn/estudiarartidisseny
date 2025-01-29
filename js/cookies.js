document.addEventListener('DOMContentLoaded', function () {
    const banner = document.querySelector('.cookies');
    const acceptButton = document.getElementById('acceptCookies');
    const rejectButton = document.getElementById('rejectCookies');
    const analyticsSwitch = document.getElementById('analyticsSwitch');
    const analyticsLabel = document.getElementById('analyticsLabel');

    // Función para gestionar cookies
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = `${name}=${value}${expires}; path=/; domain=.dnlzqn.github.io;`;
    }

    function getCookie(name) {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? match[2] : null;
    }

    function deleteCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.dnlzqn.github.io;`;
    }

function loadGoogleAnalytics() {
    if (getCookie('cookiesAccepted') === 'true') {
        console.log("🔵 Cargando Google Analytics...");

        // Si ya existe, eliminar script previo
        const oldScript = document.getElementById('ga-script');
        if (oldScript) {
            console.log("🛑 Eliminando script anterior...");
            oldScript.remove();
        }

        // Crear un nuevo script
        const script = document.createElement('script');
        script.id = 'ga-script';
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-QN34FFRZ06';

        // Agregarlo al DOM
        document.body.appendChild(script);

        script.onload = function () {
            console.log("✅ Google Analytics script cargado.");

            // Verificar si gtag está disponible
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            window.gtag = gtag;

            // Forzar ejecución de Google Analytics
            setTimeout(() => {
                console.log("📊 Configurando Google Analytics...");
                gtag('js', new Date());
                gtag('config', 'G-QN34FFRZ06');
            }, 1000);
        };

        script.onerror = function () {
            console.error("❌ Error al cargar Google Analytics.");
        };
    }
}

    // Descargar Google Analytics y eliminar sus cookies
    function unloadGoogleAnalytics() {
        console.log("🔴 Eliminando Google Analytics...");
        const script = document.getElementById('ga-script');
        if (script) {
            script.remove();
        }

        window['ga-disable-G-QN34FFRZ06'] = true; // Bloquear futuras cargas de Analytics

        // Intentar borrar cookies de Analytics con varios dominios posibles
        const analyticsCookies = ["_ga", "_gid", "_gat", "_ga_QN34FFRZ06", "_gat_gtag_UA_112997138_15"];
        analyticsCookies.forEach(cookie => {
            document.cookie = cookie + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = cookie + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.dnlzqn.github.io;";
            document.cookie = cookie + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=github.io;";
            document.cookie = cookie + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.google-analytics.com;";
        });

        console.log("✅ Las cookies de Google Analytics han sido eliminadas.");
    }

    // Actualizar el texto del switch
    function updateLabel() {
        analyticsLabel.textContent = analyticsSwitch.checked ? "Galetes acceptades" : "Galetes rebutjades";
    }

    // Inicializar preferencias
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
        analyticsSwitch.checked = false;
        updateLabel();
    });

    // Evento del switch
    analyticsSwitch.addEventListener('change', function () {
        if (analyticsSwitch.checked) {
            console.log("✅ Activando Analytics desde el switch...");
            setCookie('cookiesAccepted', 'true', 365);
            loadGoogleAnalytics();
        } else {
            console.log("🚫 Desactivando Analytics desde el switch...");
            setCookie('cookiesAccepted', 'false', 365);
            unloadGoogleAnalytics();
        }
        updateLabel();
    });

    // Inicializar todo al cargar
    initializePreferences();
});
