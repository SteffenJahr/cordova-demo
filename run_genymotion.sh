#!/bin/bash

cd cordova_build

cd recipeBook

../../node_modules/.bin/cordova prepare

../../node_modules/.bin/cordova run android --device
