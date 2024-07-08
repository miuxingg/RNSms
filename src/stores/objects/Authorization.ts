import {makeAutoObservable} from 'mobx';

export class Authorization {
  access_token = '';
  token_type = '';
  expires_in = 0;

  constructor() {
    makeAutoObservable(this);
  }
}
