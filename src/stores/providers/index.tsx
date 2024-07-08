import React, {useContext} from 'react';
import {Maybe} from '../types';
import {IRootStore, RootStore} from '../RootStore';
import {useLocalObservable} from 'mobx-react-lite';

export const MobxStoreContext = React.createContext<Maybe<IRootStore>>(null);

interface IMobxStoreProviderProps {
  children: React.ReactNode;
}

export const MobxStoreProvider: React.FC<IMobxStoreProviderProps> = ({
  children,
}) => {
  const store = useLocalObservable(() => new RootStore());

  return (
    <MobxStoreContext.Provider value={store}>
      {children}
    </MobxStoreContext.Provider>
  );
};

export const useStore = (): IRootStore => {
  const store = useContext(MobxStoreContext);
  if (!store) {
    throw new Error('Hook must be call in StoreProvider');
  }

  return store;
};

export const useAuthStore = () => {
  const store = useStore();
  return store.authStore;
};
