import axios from 'axios';

export const url = 'https://library-cleverland-2jfze.ondigitalocean.app/api/';

export const api = axios.create({
  baseURL: url,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('jwtlocalhost')}`;

  return config;
});
