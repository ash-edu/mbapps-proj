import { Platform } from 'react-native';
import { API_URL, ANDROID_API_URL } from '@env';

export const getApiUrl = () => {
  if (Platform.OS === 'android') {
    return ANDROID_API_URL;
  }
  return API_URL;
};

export const getDepartments = async () => {
  try {
      const response = await fetch(`${getApiUrl()}/api/departments`);
      if (!response.ok) {
          throw new Error('Network response error');
      }
      return await response.json();
  } catch (error) {
      console.error('Error fetching departments:', error);
      return [];
  }
};