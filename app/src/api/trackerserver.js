import axios from 'axios';
import { AsyncStorage } from 'react-native';

let url;
if (__DEV__) {
  // change the URL each time you restart ngrok
  url = 'http://e33971e2.ngrok.io';
} else {
  url = 'PROD_URL';
}

const instance = axios.create({
  baseURL: url
});

// automatically add the locally stored token to any request
instance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

export default instance;
