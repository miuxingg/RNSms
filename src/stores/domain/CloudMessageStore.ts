import {makeAutoObservable} from 'mobx';
import {RootStore} from '../RootStore';
import {FirebaseService} from '../../core/firebase';
import {operatorApi} from '@mtt-nails/apis/dist/v3';

export class CloudMessageStore {
  readonly firebaseService = new FirebaseService();

  constructor(private readonly rootStore: RootStore) {
    makeAutoObservable(this);
  }

  updateFirebaseToken = async () => {
    try {
      const token = await this.firebaseService.getToken();
      if (token) {
        await operatorApi.updateFCM({token: token});
      }
    } catch (error) {
      // this.rootStore.appStore.
      console.log(error);
    }
  };

  removeFirebaseToken = async () => {
    try {
      const token = await this.firebaseService.getToken();
      if (token) {
        await operatorApi.removeFCM({token});
      }
    } catch (error) {
      // this.rootStore.appStore.
      console.log(error);
    }
  };
}
