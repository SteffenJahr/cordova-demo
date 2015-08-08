(function ($, jQuery) {
    "use strict";

    /**
     * @constructor
     * @public
     *
     * @param $scope
     * @param $window
     */
    function InfoController($scope, $window) {
        $scope.isCordovaApp = $window.isCordovaApp;

        if ($scope.isCordovaApp) {
            $scope.info = $window.device;
        }
    }

    app.module.controller('infoController', InfoController);
})();