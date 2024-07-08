import React, {useCallback, useEffect} from 'react';
import {Platform} from 'react-native';
import {
  check,
  PERMISSIONS,
  requestMultiple,
  Permission,
} from 'react-native-permissions';
import {FirebaseService} from './core/firebase';

import PushNotification from 'react-native-push-notification';
import {MobxStoreProvider} from './stores/providers';
import {NativeBaseProvider} from 'native-base';
import {theme} from './libs/theme';
import {NavigationContainer} from '@react-navigation/native';
import {AppNavigator} from './navigator';

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

export const firebaseService = new FirebaseService();

function App(): JSX.Element {
  const checkPermistion = useCallback(async () => {
    const requestPermissionList: Permission[] = [];
    try {
      if (Platform.OS === 'android') {
        const sendSmsPermission = await check(PERMISSIONS.ANDROID.SEND_SMS);
        if (!sendSmsPermission || sendSmsPermission === 'denied') {
          requestPermissionList.push(PERMISSIONS.ANDROID.SEND_SMS);
        }

        const callPermission = await check(PERMISSIONS.ANDROID.CALL_PHONE);
        if (!callPermission || callPermission === 'denied') {
          requestPermissionList.push(PERMISSIONS.ANDROID.CALL_PHONE);
        }

        const pushNotifyPermission = await check(
          PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
        );
        if (!pushNotifyPermission || pushNotifyPermission === 'denied') {
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
  }, [checkPermistion]);

  return (
    <MobxStoreProvider>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </NativeBaseProvider>
    </MobxStoreProvider>
  );
}

export default App;
