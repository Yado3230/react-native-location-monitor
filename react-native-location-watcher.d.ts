declare module "react-native-location-watcher" {
  export function startLocationMonitoring(): void;
  export function stopLocationMonitoring(): void;
  export function checkLocationPermission(): void;
  export function subscribeToLocationStatus(
    callback: (status: string) => void
  ): () => void;
  export function subscribeToLocationPermission(
    callback: (permissionStatus: string) => void
  ): () => void;
}
