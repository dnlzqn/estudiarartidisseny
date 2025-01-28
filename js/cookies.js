document.addEventListener('DOMContentLoaded', function () {
    const acceptButton = document.getElementById('acceptCookies');
    const rejectButton = document.getElementById('rejectCookies');
    const analyticsSwitch = document.getElementById('analyticsSwitch');
    const analyticsLabel = document.getElementById('analyticsLabel'); // Referencia al span
    const banner = document.querySelector('.cookies');
    let analyticsLoaded = false; // Estado del script

    // Función para cargar el script de Google Analytics
    function loadGoogleAnalytics() {
        if (!analyticsLoaded) {
            const script = document.createElement('script');
            script.id = 'googleAnalyticsScript';
            script.async = true;
            script.src = 'https://www.googletagmanager.com/gtag/js?id=G-QN34FFRZ06';
            document.body.appendChild(script);

            script.onload = function () {
                window.dataLayer = window.dataLayer || [];
                function gtag() { dataLayer.push(arguments); }
                gtag('js', new Date());
                gtag('config', 'G-QN34FFRZ06');
                analyticsLoaded = true;
                updateLabel(true);
                console.log("Google Analytics carregat.");
            };
        }
    }

    // Función para descargar el script de Google Analytics
    function unloadGoogleAnalytics() {
        const script = document.getElementById('googleAnalyticsScript');
        if (script) {
            script.remove(); // Eliminar el script del DOM
            if (window.dataLayer) {
                window.dataLayer = []; // Vaciar el dataLayer
            }
            analyticsLoaded = false;
            updateLabel(false);
            console.log("Google Analytics eliminat.");
        }
    }

    // Función para actualizar el texto del label
    function updateLabel(isAccepted) {
        if (isAccepted) {
            analyticsLabel.textContent = 'Cookie acceptada';
        } else {
            analyticsLabel.textContent = 'Cookie rebutjada';
        }
    }

    // Función para manejar el estado del switch
    function handleSwitchChange() {
        if (analyticsSwitch.checked) {
            loadGoogleAnalytics();
            updateLabel(true);
        } else {
            unloadGoogleAnalytics();
            updateLabel(false);
        }
    }

    // Evento para aceptar las cookies desde el banner
    acceptButton.addEventListener('click', function () {
        loadGoogleAnalytics();
        analyticsSwitch.checked = true; // Reflejar el estado en el switch
        updateLabel(true); // Actualizar el texto
        banner.style.display = 'none';
    });

    // Evento para rechazar las cookies desde el banner
    rejectButton.addEventListener('click', function () {
        unloadGoogleAnalytics();
        analyticsSwitch.checked = false; // Reflejar el estado en el switch
        updateLabel(false); // Actualizar el texto
        banner.style.display = 'none';
    });

    // Evento para manejar el cambio de estado del switch
    analyticsSwitch.addEventListener('change', handleSwitchChange);
});
