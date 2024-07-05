import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import {MessageTitle} from '@mtt-nails/consts';

// const firebaseConfig = {
//   apiKey: 'AIzaSyB9EZwc-Wn61BEfOLjl1YcRue-n23uz-Ho',
//   authDomain: 'nailshop-f96bc.firebaseapp.com',
//   projectId: 'nailshop-f96bc',
//   storageBucket: 'nailshop-f96bc.appspot.com',
//   messagingSenderId: '660743887071',
//   appId: '1:660743887071:web:a1b5004a00da0a846df16a',
//   measurementId: 'G-H9DXEDEF97',
//   databaseURL: '',
// };

export class FirebaseService {
  constructor() {
    if (!firebase.apps.length) {
      firebase.app();
    }
  }

  async firebaseRequestPermission() {
    try {
      const enable = await messaging().hasPermission();
      if (!enable) {
        await messaging().requestPermission();
      }
    } catch (error) {}
  }
  async geToken() {
    const token = await messaging().getToken();
    console.log({token});
  }

  onMessage(
    callback: (
      type: MessageTitle,
      data: {phone: string; messages?: string},
    ) => void,
  ) {
    const unsubscribe = messaging().onMessage(
      async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        const data = remoteMessage.data as any;
        callback(data.type, JSON.parse(data.body));
      },
    );

    return unsubscribe;
  }

  onBackgroundMessage(
    callback: (
      type: MessageTitle,
      data: {phone: string; messages?: string},
    ) => void,
  ) {
    const unsubscribe = messaging().setBackgroundMessageHandler(
      async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        const data = remoteMessage.data as any;
        callback(data.type, JSON.parse(data.body));
      },
    );

    return unsubscribe;
  }
}
