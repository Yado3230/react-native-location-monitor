"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeToLocationPermission = exports.subscribeToLocationStatus = exports.checkLocationPermission = exports.stopLocationMonitoring = exports.startLocationMonitoring = void 0;
const react_native_1 = require("react-native");
const { LocationModule } = react_native_1.NativeModules;
const locationEventEmitter = new react_native_1.NativeEventEmitter(LocationModule);
const startLocationMonitoring = () => {
    LocationModule.startMonitoring();
};
exports.startLocationMonitoring = startLocationMonitoring;
const stopLocationMonitoring = () => {
    LocationModule.stopMonitoring();
};
exports.stopLocationMonitoring = stopLocationMonitoring;
const checkLocationPermission = () => {
    LocationModule.checkLocationPermission();
};
exports.checkLocationPermission = checkLocationPermission;
const subscribeToLocationStatus = (callback) => {
    const listener = locationEventEmitter.addListener("LocationStatus", callback);
    return () => listener.remove();
};
exports.subscribeToLocationStatus = subscribeToLocationStatus;
const subscribeToLocationPermission = (callback) => {
    const listener = locationEventEmitter.addListener("LocationPermission", callback);
    return () => listener.remove();
};
exports.subscribeToLocationPermission = subscribeToLocationPermission;
