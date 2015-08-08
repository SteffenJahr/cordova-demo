(function () {
    "use strict";

    /**
     * @ngdoc service
     * @param $window
     * @param $injector
     * @public
     */
    function StorageService($window, $injector) {
        if ($window.isCordovaApp) {
            return $injector.get('fileStorageService');
        }
        return $injector.get('localStorageService');

    }

    app.module.service('storageService', StorageService);
})();