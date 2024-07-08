import {makeAutoObservable, runInAction} from 'mobx';
import {Authorization} from '../objects/Authorization';
import {IRootStore} from '../RootStore';
import {Maybe} from '../types';
import {operatorApi} from '@mtt-nails/apis/dist/v3';

export class AuthStore {
  accessToken: Maybe<Authorization> = null;
  interceptor?: number;

  constructor(readonly rootStore: IRootStore) {
    makeAutoObservable(this);
  }

  setAccessToken = async (token: Maybe<Authorization>) => {
    runInAction(() => {
      this.accessToken = token;
    });
    if (token) {
      operatorApi.authorizeApi(token);
      await this.rootStore.storageStore.saveToken(JSON.stringify(token));
      await this.rootStore.managerProfileStore.fetchManagerInfo();
      await this.rootStore.cloudMessageStore.updateFirebaseToken();
      // await this.setSocket();
    } else {
      await this.rootStore.storageStore.removeToken();
    }
  };

  login = async (values: {username: string; password: string}) => {
    try {
      // call api login
      const {data} = await operatorApi.authenticate(values);
      await this.setAccessToken(data);
    } catch (error: any) {
      console.log('err: ', error);
      // this.errorWhenLogin = error.response.data.message;
    }
  };

  get isAuthenticated(): boolean {
    return !!this.rootStore.managerProfileStore.infoManager;
  }

  logout = async () => {
    this.setAccessToken(null);
    this.rootStore.managerProfileStore.setInfoManager(null);
    this.rootStore.cloudMessageStore.removeFirebaseToken();
    operatorApi.deauthorizeApi();
    this.eject();
  };

  inject() {
    this.interceptor = operatorApi.inject.response(error => {
      if (error && error.response && error.response.status === 401) {
        this.logout();
      }
    });
  }
  eject() {
    if (this.interceptor !== undefined) {
      operatorApi.eject.response(this.interceptor);
    }
  }
}
