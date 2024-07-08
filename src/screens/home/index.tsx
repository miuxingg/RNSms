import React, {useCallback, useEffect, useState} from 'react';
import Layout from '../../components/layout';
import {View, Text} from 'native-base';
import {observer} from 'mobx-react-lite';
import {MessageTitle} from '@mtt-nails/consts';
import {AppState, NativeModules} from 'react-native';
import {firebaseService} from '../../App';
import PushNotification from 'react-native-push-notification';

const {SmsModule, PhoneCallModule} = NativeModules;

const HomeScreen = observer(() => {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    // firebaseService.onMessage(handlePressCallButton);

    const subscription = AppState.addEventListener('change', nextAppState => {
      setAppState(nextAppState);
      return () => {
        subscription.remove();
      };
    });
  }, []);

  const handlePressSmsButton = (phone: string, msg: string) => {
    SmsModule.sendSms(phone, msg);
  };

  const handlePressCallButton = async (phone: string) => {
    PhoneCallModule.call(phone);
  };

  const handleAction = useCallback(
    (type: MessageTitle, data: {phone: string; messages?: string}) => {
      if (type === MessageTitle.CallPhone) {
        handlePressCallButton(data.phone);
      }
      if (type === MessageTitle.SendSMS) {
        handlePressSmsButton(data.phone, data?.messages || '');
        if (appState !== 'active') {
          PushNotification.localNotification({
            channelId: 'nailshop-channel-id',
            title: 'Nailshop',
            message: data?.messages || '',
          });
        }
      }
    },
    [appState],
  );

  useEffect(() => {
    if (appState === 'active') {
      firebaseService.onMessage(handleAction);
    } else {
      firebaseService.onBackgroundMessage(handleAction);
    }
  }, [appState, handleAction]);
  return (
    <Layout>
      <View>
        <Text>Home</Text>
      </View>
    </Layout>
  );
});

export default HomeScreen;
