import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_SESSION_KEY = '@newapp/auth-session';

export const saveAuthSession = async user => {
  await AsyncStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(user));
};

export const getAuthSession = async () => {
  const session = await AsyncStorage.getItem(AUTH_SESSION_KEY);
  return session ? JSON.parse(session) : null;
};

export const clearAuthSession = async () => {
  await AsyncStorage.removeItem(AUTH_SESSION_KEY);
};
