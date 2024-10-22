package main.java.com.locationmonitor;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.location.LocationManager;
import androidx.core.content.ContextCompat;
import android.content.pm.PackageManager;
import android.Manifest;
import androidx.core.app.ActivityCompat;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.LifecycleEventListener;

public class LocationModule extends ReactContextBaseJavaModule implements LifecycleEventListener {

    private final BroadcastReceiver locationReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            LocationManager locationManager = (LocationManager) context.getSystemService(Context.LOCATION_SERVICE);
            boolean isGpsEnabled = locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER);
            boolean isNetworkEnabled = locationManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER);

            if (isGpsEnabled || isNetworkEnabled) {
                sendEvent("LocationStatus", "enabled");
            } else {
                sendEvent("LocationStatus", "disabled");
            }
        }
    };

    public LocationModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addLifecycleEventListener(this);
    }

    @Override
    public String getName() {
        return "LocationModule";
    }

    @ReactMethod
    public void checkLocationPermission() {
        int permissionStatus = ContextCompat.checkSelfPermission(
            getReactApplicationContext(),
            Manifest.permission.ACCESS_FINE_LOCATION
        );

        if (permissionStatus == PackageManager.PERMISSION_GRANTED) {
            sendEvent("LocationPermission", "granted");
        } else {
            sendEvent("LocationPermission", "denied");
        }
    }

    @ReactMethod
    public void startMonitoring() {
        IntentFilter filter = new IntentFilter(LocationManager.PROVIDERS_CHANGED_ACTION);
        getReactApplicationContext().registerReceiver(locationReceiver, filter);
        checkLocationPermission();
    }

    @ReactMethod
    public void stopMonitoring() {
        getReactApplicationContext().unregisterReceiver(locationReceiver);
    }

    private void sendEvent(String eventName, String params) {
        getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
    }

    @Override
    public void onHostResume() {
        checkLocationPermission();
    }

    @Override
    public void onHostPause() {
    }

    @Override
    public void onHostDestroy() {
        stopMonitoring();
    }
}
