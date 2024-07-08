import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {observer} from 'mobx-react-lite';
import HomeScreen from '../screens/home';
import {ConfigNavigator} from './config';
import LoginScreen from '../screens/login';
import {useAuthStore} from '../stores/providers';

const RootStack = createNativeStackNavigator();
export const AppNavigator = observer(() => {
  const authStore = useAuthStore();
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {authStore.isAuthenticated ? (
        <RootStack.Screen
          name={ConfigNavigator.screens.Home}
          component={HomeScreen}
        />
      ) : (
        <RootStack.Screen
          name={ConfigNavigator.screens.Login}
          component={LoginScreen}
        />
      )}
    </RootStack.Navigator>
  );
});
