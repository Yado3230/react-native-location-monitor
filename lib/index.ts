import { NativeModules, NativeEventEmitter } from "react-native";

const { LocationModule } = NativeModules;
const locationEventEmitter = new NativeEventEmitter(LocationModule);

export const startLocationMonitoring = (): void => {
  LocationModule.startMonitoring();
};

export const stopLocationMonitoring = (): void => {
  LocationModule.stopMonitoring();
};

export const checkLocationPermission = (): void => {
  LocationModule.checkLocationPermission();
};

export const subscribeToLocationStatus = (
  callback: (status: string) => void
): (() => void) => {
  const listener = locationEventEmitter.addListener("LocationStatus", callback);
  return () => listener.remove();
};

export const subscribeToLocationPermission = (
  callback: (status: string) => void
): (() => void) => {
  const listener = locationEventEmitter.addListener(
    "LocationPermission",
    callback
  );
  return () => listener.remove();
};
