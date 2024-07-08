import React from 'react';
import {SafeAreaView} from 'react-native';

interface ILayout {
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({children}) => {
  return <SafeAreaView>{children}</SafeAreaView>;
};

export default Layout;
