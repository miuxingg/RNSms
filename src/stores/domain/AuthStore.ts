import {makeAutoObservable} from 'mobx';
import {Authorization} from '../objects/Authorization';
import {IRootStore} from '../RootStore';
import {Maybe, UserLogin} from '../types';

export class AuthStore {
  accessToken: Maybe<Authorization> = null;
  loading = false;
  loginData: UserLogin = {
    username: '',
    password: '',
  };

  constructor(readonly rootStore: IRootStore) {
    makeAutoObservable(this);
  }
}
