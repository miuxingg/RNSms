import {Operator, operatorApi} from '@mtt-nails/apis/dist/v3';
import {makeAutoObservable, runInAction} from 'mobx';

import {Maybe} from '../types';

export class ManagerProfileStore {
  infoManager: Maybe<Operator.ProfileManager> = null;

  constructor() {
    makeAutoObservable(this);
  }

  fetchManagerInfo = async () => {
    try {
      const {data} = await operatorApi.getProfileManager();
      console.log('---> ', data);
      runInAction(() => {
        this.infoManager = data;
      });
    } catch (error) {
      runInAction(() => {
        this.infoManager = null;
      });
      return null;
    }
  };

  setInfoManager = (manager: Maybe<Operator.ProfileManager>) => {
    this.infoManager = manager;
  };
}
