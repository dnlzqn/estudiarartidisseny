document.addEventListener('DOMContentLoaded', function () {
    const banner = document.querySelector('.cookies');
    const acceptButton = document.getElementById('acceptCookies');
    const rejectButton = document.getElementById('rejectCookies');

    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    function getCookie(name) {
        let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? match[2] : null;
    }

    if (getCookie('cookiesAccepted') === 'true') {
        banner.style.display = 'none';
        loadGoogleAnalytics();
    } else if (getCookie('cookiesAccepted') === 'false') {
        banner.style.display = 'none';
    }

    acceptButton.addEventListener('click', function () {
        setCookie('cookiesAccepted', 'true', 365);
        banner.style.display = 'none';
        loadGoogleAnalytics();
    });

    rejectButton.addEventListener('click', function () {
        setCookie('cookiesAccepted', 'false', 365);
        banner.style.display = 'none';
    });

    function loadGoogleAnalytics() {
        var script = document.createElement('script');
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
});
