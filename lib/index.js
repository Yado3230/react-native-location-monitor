"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeToLocationPermission = exports.subscribeToLocationStatus = exports.checkLocationPermission = exports.stopLocationMonitoring = exports.startLocationMonitoring = void 0;
var react_native_1 = require("react-native");
var LocationModule = react_native_1.NativeModules.LocationModule;
var locationEventEmitter = new react_native_1.NativeEventEmitter(LocationModule);
var startLocationMonitoring = function () {
    LocationModule.startMonitoring();
};
exports.startLocationMonitoring = startLocationMonitoring;
var stopLocationMonitoring = function () {
    LocationModule.stopMonitoring();
};
exports.stopLocationMonitoring = stopLocationMonitoring;
var checkLocationPermission = function () {
    LocationModule.checkLocationPermission();
};
exports.checkLocationPermission = checkLocationPermission;
var subscribeToLocationStatus = function (callback) {
    var listener = locationEventEmitter.addListener("LocationStatus", callback);
    return function () { return listener.remove(); };
};
exports.subscribeToLocationStatus = subscribeToLocationStatus;
var subscribeToLocationPermission = function (callback) {
    var listener = locationEventEmitter.addListener("LocationPermission", callback);
    return function () { return listener.remove(); };
};
exports.subscribeToLocationPermission = subscribeToLocationPermission;
