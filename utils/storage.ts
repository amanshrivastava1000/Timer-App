import AsyncStorage from '@react-native-async-storage/async-storage';

export const getTimers = async () => {
  const data = await AsyncStorage.getItem('timers');
  return data ? JSON.parse(data) : [];
};

export const saveTimers = async (timers: any[]) => {
  await AsyncStorage.setItem('timers', JSON.stringify(timers));
};

export const getHistory = async () => {
  const data = await AsyncStorage.getItem('timerHistory');
  return data ? JSON.parse(data) : [];
};

export const saveHistory = async (history: any[]) => {
  await AsyncStorage.setItem('timerHistory', JSON.stringify(history));
};
