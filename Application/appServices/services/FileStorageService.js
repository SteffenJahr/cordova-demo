(function () {
    "use strict";

    /**
     * @ngdoc service
     * @param $window
     * @param $q
     * @public
     */
    function FileStorageService($window, $q) {
        var directory = $window.cordova.file.dataDirectory;

        function checkFileExists(fileName) {
            var deferred = $q.defer();
            $window.resolveLocalFileSystemURL(directory + fileName + '.json', function (fileSystem) {
                if (fileSystem.isFile === true) {
                    deferred.resolve(true);
                }
                else {
                    deferred.resolve(false);
                }
            }, function (error) {
                if (error.code === 1) {
                    deferred.resolve(false);
                }
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function initFile(fileName) {
            var deferred = $q.defer();
            checkFileExists(fileName)
                .then(function (exists) {
                    if (!exists) {
                        $window.resolveLocalFileSystemURL(directory, function (fileSystem) {
                            fileSystem.getFile(fileName + '.json', { create: true, exclusive: true }, function (file) {
                                deferred.resolve();
                            }, function (error) {
                                deferred.reject(error);
                            });
                        }, function (error) {
                            deferred.reject(error);
                        });
                    }
                    else {
                        deferred.resolve();
                    }
                });

            return deferred.promise;
        }

        function loadFile(fileName) {
            var deferred = $q.defer();
            initFile(fileName)
                .then(function () {
                    $window.resolveLocalFileSystemURL(directory, function (fileSystem) {
                        fileSystem.getFile(fileName + '.json', { create: false }, function (file) {
                            deferred.resolve(file);
                        }, function (error) {
                            deferred.reject(error);
                        });
                    }, function (error) {
                        deferred.reject(error);
                    });
                });

            return deferred.promise;
        }

        function getFileValue(fileName) {
            var deferred = $q.defer();
            loadFile(fileName)
                .then(function (file) {
                    file.file(function (fileData) {
                        var fileReader = new FileReader();
                        fileReader.onloadend = function (event) {
                            var result;
                            result = event.target.result !== '' ? angular.fromJson(event.target.result) : {};
                            deferred.resolve(result);
                        };
                        fileReader.readAsText(fileData);
                    });
                });

            return deferred.promise;
        }

        function writeFileValue(value, fileName) {
            var deferred = $q.defer();
            loadFile(fileName)
                .then(function (file) {
                    file.createWriter(function (fileWrite) {
                        fileWrite.onwriteend = function (event) {
                            if (event.target.error) {
                                deferred.reject(event.target.error);
                            }
                            deferred.resolve();
                        };
                        fileWrite.write(angular.toJson(value));
                    }, function (error) {
                        deferred.reject(error);
                    });
                });
            return deferred.promise;
        }

        this.addItem = function (key, item, fileName) {
            return getFileValue(fileName)
                .then(function (items) {
                    items = items || {};
                    items[key] = item;
                    return writeFileValue(items, fileName)
                });
        };

        this.getItemByKey = function (key, fileName) {
            var deferred = $q.defer();
            getFileValue(fileName)
                .then(function (items) {
                    deferred.resolve(items[key]);
                }, function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };

        this.getAllItems = function (fileName) {
            return getFileValue(fileName);
        };

        this.removeItem = function (key, fileName) {
            return getFileValue(fileName)
                .then(function (items) {
                    delete items[key];
                    return writeFileValue(items, fileName);
                }, function (error) {
                    return $q.reject(error);
                });
        };

        this.setItem = function (key, item, fileName) {
            return getFileValue(fileName)
                .then(function (items) {
                    items[key] = item;
                    return writeFileValue(items, fileName);
                }, function (error) {
                    return $q.reject(error);
                });
        };
    }

    app.module.service('fileStorageService', FileStorageService);
})();