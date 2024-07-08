import {CloudMessageStore} from './domain/CloudMessageStore';
import {AppStore} from './domain/AppStore';
import {AuthStore} from './domain/AuthStore';
import {ManagerProfileStore} from './domain/ManagerProfileStore';
import {StorageStore} from './domain/StorageStore';

export interface IRootStore {
  storageStore: StorageStore;
  cloudMessageStore: CloudMessageStore;
  appStore: AppStore;
  authStore: AuthStore;
  managerProfileStore: ManagerProfileStore;
}

export class RootStore implements IRootStore {
  storageStore: StorageStore;
  cloudMessageStore: CloudMessageStore;
  appStore: AppStore;
  authStore: AuthStore;
  managerProfileStore: ManagerProfileStore;

  constructor() {
    this.storageStore = new StorageStore();
    this.appStore = new AppStore(this);
    this.cloudMessageStore = new CloudMessageStore(this);
    this.authStore = new AuthStore(this);
    this.managerProfileStore = new ManagerProfileStore();
  }
}
