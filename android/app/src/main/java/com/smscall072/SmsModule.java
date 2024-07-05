package com.smscall072;

import android.telephony.SmsManager;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
public class SmsModule extends ReactContextBaseJavaModule {

    SmsModule(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "SmsModule";
    }

    @ReactMethod
    public void sendSms(String numberPhone, String msg) {
        SmsManager sms= SmsManager.getDefault();
        sms.sendTextMessage(numberPhone, null, msg, null,null);
    }

}
