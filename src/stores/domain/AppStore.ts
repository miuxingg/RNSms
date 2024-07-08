// import {API_URI, SOCKET_URI} from '@env';
import {operatorApi} from '@mtt-nails/apis/dist/v3';
// import socket from '@mtt-nails/socket-events';
// import i18next from 'i18next';
import {get, isObject} from 'lodash';
import {makeAutoObservable, runInAction} from 'mobx';

// import i18n from '../../locales/i18n';
import {IRootStore} from '../RootStore';
import {Maybe} from '../types';
import {API_URI} from '@env';

export enum NotificationStatus {
  Info = 'info',
  Success = 'success',
  Error = 'error',
}

export class Notification {
  status = NotificationStatus.Info;
  title: Maybe<string> = null;
  message: Maybe<string> = null;

  constructor() {
    makeAutoObservable(this);
  }

  reset = () => {
    setTimeout(() => {
      runInAction(() => {
        this.message = null;
        this.title = null;
      });
    }, 0);
  };

  setError = (error: any) => {
    runInAction(() => {
      this.message = `${this.__getMessage(error)}`;
      this.status = NotificationStatus.Error;
    });
  };

  setSuccess = (success: any) => {
    runInAction(() => {
      this.message = `${this.__getMessage(success)}`;
      this.status = NotificationStatus.Success;
    });
  };

  setInfo = (notification: any) => {
    runInAction(() => {
      this.message = `${this.__getMessage(notification)}`;
      this.status = NotificationStatus.Info;
    });
  };

  __getMessage = (data: any) => {
    let msg = '';
    if (typeof data === 'string') {
      msg = data;
    } else if (this.__errorFormApi(data)) {
      msg = get(data, 'response.data.message') || get(data, 'message');
    } else if (data && isObject(data) && 'message' in data) {
      const {message} = data as {message: string};
      msg = message;
    }
    return msg.replace(/"/g, "'");
  };
  __errorFormApi = (error: any) => {
    return (
      isObject(error) &&
      'config' in error &&
      'request' in error &&
      'response' in error
    );
  };
}

export class AppStore {
  isReady?: boolean = false;
  notify = new Notification();
  // language = i18next.language;

  constructor(private rootStore: IRootStore) {
    makeAutoObservable(this);
    this.init();
  }

  setIsReady = (isReady: boolean) => {
    runInAction(() => {
      this.isReady = isReady;
    });
  };

  // changeLanguage = async (language: string) => {
  //   try {
  //     const {data} = await operatorApi.getLanguage(language);
  //     i18next.addResourceBundle(language, 'common', data);
  //   } catch (error) {
  //     this.notify.setError(error);
  //   }
  //   this.language = language;
  //   i18next.changeLanguage(language);
  //   await this.rootStore.storageStore.setDefaultLanguage(language);
  // };

  // getLocalLanguage = async () => {
  //   const defauLanguage =
  //     await this.rootStore.storageStore.getDefaultLanguage();
  //   this.language = defauLanguage || 'vi';
  //   try {
  //     const {data} = await operatorApi.getLanguage(defauLanguage);
  //     i18next.addResourceBundle(defauLanguage, 'common', data);
  //   } catch (error) {
  //     this.notify.setError(error);
  //   }
  //   i18next.changeLanguage(defauLanguage);
  // };

  init = async () => {
    try {
      this.isReady = false;

      // set api server uri
      operatorApi.setBaseUrl(API_URI || 'http://localhost:8083');
      // set api server uri
      // supportApi.setBaseUrl('http://localhost:8083');
      // set socket server uri
      // socket.setSocketServer(SOCKET_URI || 'http://localhost:493');
      // await this.getLocalLanguage();

      // (socket as any).setOptions({path: undefined});
    } catch (error) {
      this.notify.setError(error);
    } finally {
      this.isReady = true;
    }
  };
}
