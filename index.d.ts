export declare const startLocationMonitoring: () => void;
export declare const stopLocationMonitoring: () => void;
export declare const checkLocationPermission: () => void;
export declare const subscribeToLocationStatus: (callback: (status: string) => void) => (() => void);
export declare const subscribeToLocationPermission: (callback: (status: string) => void) => (() => void);
