import axios from 'axios';
import locolhost from './utils/locolhost';

const instance = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/',
});
instance.interceptors.request.use((config) => {
  console.log(config, 'config');
  if (config.url.includes('/passport')) {
    console.log('进入config');
    return config;
  } if (config.url.includes('/login')) {
    return config;
  }
  const { appkey } = locolhost.getUser('user');
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
