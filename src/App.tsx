import React, {useCallback, useEffect, useState} from 'react';
import {
  AppState,
  Button,
  NativeModules,
  Platform,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {
  check,
  PERMISSIONS,
  requestMultiple,
  Permission,
} from 'react-native-permissions';
import {FirebaseService} from './core/firebase';

import PushNotification from 'react-native-push-notification';
import {MessageTitle} from '@mtt-nails/consts';

PushNotification.createChannel(
  {
    channelId: 'nailshop-channel-id',
    channelName: 'nailshop',
    channelDescription: 'Channel desc nailshop',
    playSound: true,
    importance: 4,
    vibrate: true,
  },
  created => {
    console.log({created});
  },
);

const {SmsModule, PhoneCallModule} = NativeModules;

const firebaseService = new FirebaseService();

function App(): JSX.Element {
  const [appState, setAppState] = useState(AppState.currentState);
  const checkPermistion = useCallback(async () => {
    const requestPermissionList: Permission[] = [];
    try {
      if (Platform.OS === 'android') {
        const sendSmsPermission = await check(PERMISSIONS.ANDROID.SEND_SMS);
        if (!sendSmsPermission || sendSmsPermission === 'denied') {
          // request(PERMISSIONS.ANDROID.SEND_SMS);
          requestPermissionList.push(PERMISSIONS.ANDROID.SEND_SMS);
        }

        const callPermission = await check(PERMISSIONS.ANDROID.CALL_PHONE);
        if (!callPermission || callPermission === 'denied') {
          // request(PERMISSIONS.ANDROID.CALL_PHONE);
          requestPermissionList.push(PERMISSIONS.ANDROID.CALL_PHONE);
        }

        const pushNotifyPermission = await check(
          PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
        );
        if (!pushNotifyPermission || pushNotifyPermission === 'denied') {
          // request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
          requestPermissionList.push(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
        }
        await requestMultiple(requestPermissionList);
        await firebaseService.firebaseRequestPermission();
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    checkPermistion();
    // firebaseService.onMessage(handlePressCallButton);

    const subscription = AppState.addEventListener('change', nextAppState => {
      setAppState(nextAppState);
      return () => {
        subscription.remove();
      };
    });
  }, [checkPermistion]);

  const handlePressSmsButton = (phone: string, msg: string) => {
    console.log('-----> handlePressSmsButton');
    SmsModule.sendSms(phone, msg);
  };

  const handlePressCallButton = async (phone: string) => {
    console.log('-----> handlePressCallButton');
    PhoneCallModule.call(phone);
  };

  const handleAction = useCallback(
    (type: MessageTitle, data: {phone: string; messages?: string}) => {
      console.log({type, data});
      if (type === MessageTitle.CallPhone) {
        handlePressCallButton(data.phone);
      }
      if (type === MessageTitle.SendSMS) {
        handlePressSmsButton(data.phone, data?.messages || '');
      }
    },
    [],
  );

  useEffect(() => {
    if (appState === 'active') {
      firebaseService.onMessage(handleAction);
    } else {
      firebaseService.onBackgroundMessage(handleAction);
      PushNotification.localNotification({
        channelId: 'nailshop-channel-id',
        title: 'Nailshop',
        message: 'Background notify',
      });
    }
  }, [appState, handleAction]);

  const handlePressGetTokenButton = () => {
    firebaseService.geToken();
  };
  return (
    <SafeAreaView>
      <View>
        <Text>Phone Call App</Text>
      </View>
      {/* <View>
        <Button onPress={handlePressSmsButton} title="Sms click" />
      </View>
      <View>
        <Button onPress={handlePressCallButton} title="Phone call" />
      </View> */}
      <View>
        <Button onPress={handlePressGetTokenButton} title="Update token" />
      </View>
    </SafeAreaView>
  );
}

export default App;
