import AsyncStorage from '@react-native-async-storage/async-storage';
import {makeAutoObservable} from 'mobx';

export enum StorageKey {
  ACCESS_TOKEN_KEY = '__access_token__',
}

export class StorageStore {
  constructor() {
    makeAutoObservable(this);
  }

  async saveToken(token: string) {
    await AsyncStorage.setItem(StorageKey.ACCESS_TOKEN_KEY, token);
  }
  async getToken(): Promise<string> {
    return (await AsyncStorage.getItem(StorageKey.ACCESS_TOKEN_KEY)) || '';
  }
  async removeToken(): Promise<void> {
    AsyncStorage.removeItem(StorageKey.ACCESS_TOKEN_KEY);
  }

  async clear() {
    await AsyncStorage.clear();
  }
}
