import {AuthStore} from './domain/AuthStore';

export interface IRootStore {
  authStore: AuthStore;
}

export class RootStore implements IRootStore {
  authStore: AuthStore;

  constructor() {
    this.authStore = new AuthStore(this);
  }
}
