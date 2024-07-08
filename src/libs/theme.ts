import {extendTheme} from 'native-base';

const colors = {
  white: '#FFF',
  black: '#000',
  primary: {
    100: '#1F6EAC',
    200: '#F8F8F8',
  },
  secondary: {
    50: '#eb575733',
    100: '#EB5757',
  },
  blue: {
    50: '#F0F7FC',
    100: '#D8EBFC',
    200: '#589DC0',
    300: '#EEF5F9',
    400: '#FEFEFF',
  },
  gray: {
    50: '#E0E0E0',
    100: '#D4D4D4',
    200: '#AEB4BC',
    300: '#474D57',
    400: '#EDEDED',
    500: '#ECECEC',
    600: '#DFDFDF',
    700: '#828282',
    800: '#a3a3a3',
    900: '#999999',
  },
  red: {
    50: '#DD3855',
    100: '#F9D9DE',
    200: '#F8D8DE',
    300: '#F2CCD9',
    400: '#979797',
  },
  yellow: {
    50: '#F7BD40',
    100: '#F8F0E0',
  },
  green: {
    50: '#E3F6E2',
    100: '#128F63',
  },
  background: '#eef5f9',
};

const fontConfig = {
  primary: {
    400: 'Inter-Regular',
    600: 'Inter-Medium',
    700: 'Inter-Bold',
  },
  secondary: {
    400: 'Roboto',
    600: 'Roboto-Medium',
    700: 'Roboto-Bold',
  },
};
export const theme = extendTheme({
  colors,
  fontConfig,
});
