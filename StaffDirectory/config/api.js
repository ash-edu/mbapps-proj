import { Platform } from 'react-native';
import { API_URL, ANDROID_API_URL } from '@env';

export const getApiUrl = () => {
  if (Platform.OS === 'android') {
    return ANDROID_API_URL;
  }
  return API_URL;
};