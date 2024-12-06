import { Platform } from 'react-native';
import { API_URL, ANDROID_API_URL } from '@env';

export const getApiUrl = () => {
  if (Platform.OS === 'android') {
    return ANDROID_API_URL;
  }
  return API_URL;
};

export const getDepartments = async () => { // dep picker
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

/* refs:
env variables & api urls
developer.android.com/tools/variables
stackoverflow.com/questions/51024542/how-to-inject-api-server-url-when-deploying-react-frontend
stackoverflow.com/questions/28296237/set-android-home-environment-variable-in-mac
designdebt.club/android-studio-environment-variables-on-mac/

platform module
reactnative.dev/docs/platform
detects the platform in which the app is running
*/