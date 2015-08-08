document.addEventListener('deviceready', function () {
    if (window.device && device.platform === 'iOS') {
        window.document.body.classList.add('iOS');
    }
});