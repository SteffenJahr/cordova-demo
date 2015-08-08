(function ($, jQuery) {
    "use strict";

    /**
     * @ngdoc service
     * @param $window
     * @param $q
     * @public
     */
    function LocalStorageService($window, $q) {
        this.addItem = function (key, item, storageName) {
            var deferred = $q.defer();
            var items = angular.fromJson($window.localStorage.getItem(storageName));
            items = items || {};
            items[key] = item;
            $window.localStorage.setItem(storageName, angular.toJson(items));
            deferred.resolve();
            return deferred.promise;
        };

        this.getItemByKey = function (key, storageName) {
            var deferred = $q.defer();
            var items = angular.fromJson($window.localStorage.getItem(storageName));
            deferred.resolve(items[key]);
            return deferred.promise;
        };

        this.getAllItems = function (storageName) {
            var deferred = $q.defer();
            deferred.resolve(angular.fromJson($window.localStorage.getItem(storageName)) || {});
            return deferred.promise;
        };

        this.removeItem = function (key, storageName) {
            var deferred = $q.defer();
            var items = angular.fromJson($window.localStorage.getItem(storageName));
            delete items[key];
            $window.localStorage.setItem(storageName, angular.toJson(items));
            deferred.resolve();
            return deferred.promise;
        };

        this.setItem = function (key, item, storageName) {
            var deferred = $q.defer();
            var items = angular.fromJson($window.localStorage.getItem(storageName));
            items = items || {};
            items[key] = item;
            $window.localStorage.setItem(storageName, angular.toJson(items));
            deferred.resolve();
            return deferred.promise;
        };
    }

    app.module.service('localStorageService', LocalStorageService);
})();
