import axios from 'axios';
import locolhost from './utils/locolhost';

const instance = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/',
});
const { appkey } = locolhost.getUser('user');
console.log(appkey, 'appkey');
instance.interceptors.request.use((config) => {
  console.log(config, 'config');
  if (config.url.includes('/passport')) {
    console.log('进入config');
    return config;
  }
  return {
    ...config,
    params: {
      ...config.params,
      appkey,
    },
  };
}, (error) => Promise.reject(error));

instance.interceptors.response.use((response) => {
  console.log(response, 'config');
  return response;
}, (error) => Promise.reject(error));
export default instance;
