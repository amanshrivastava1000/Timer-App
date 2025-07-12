import { Appearance } from 'react-native';

export const lightTheme = {
  background: '#e3eafc',
  card: '#fff',
  text: '#263238',
  primary: '#1976d2',
  accent: '#388e3c',
  border: '#cfd8dc',
  input: '#f5f7fa',
  placeholder: '#90a4ae',
  shadow: '#000',
  icon: '#1976d2',
  danger: '#d32f2f',
  warning: '#fbc02d',
  info: '#fbc02d',
  success: '#388e3c',
};

export const darkTheme = {
  background: '#181c24',
  card: '#232a36',
  text: '#e3eafc',
  primary: '#90caf9',
  accent: '#81c784',
  border: '#374151',
  input: '#232a36',
  placeholder: '#b0bec5',
  shadow: '#000',
  icon: '#90caf9',
  danger: '#ef5350',
  warning: '#ffd54f',
  success: '#81c784',
};

export const getSystemTheme = () =>
  Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme;
