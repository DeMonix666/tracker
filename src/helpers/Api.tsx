import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { endpoint } from 'config/tracker.json';
import store from 'store';

interface fetchProps {
  method?: 'get' | 'post' | 'delete' | 'patch';
  url: string;
  token?: boolean;
  params?: any;
  signal?: any;
  headers?: any;
  cookie?: any;
  nonce?: any;
  form?: boolean;
}

export const get = async (data: fetchProps) => {
  return await fetch({
    ...data,
    method: 'get',
  });
};

export const post = async (data: fetchProps) => {
  return await fetch({
    ...data,
    method: 'post',
  });
};

export const patch = async (data: fetchProps) => {
  return await fetch({
    ...data,
    method: 'patch',
  });
};

export const del = async (data: fetchProps) => {
  return await fetch({
    ...data,
    method: 'delete',
  });
};

export const upload = async (data: fetchProps) => {
  return await fetch({
    ...data,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    },
  });
};

const fetch = async (fetchData: fetchProps) => {
  const app = store.getState().app;
  let reqHeaders: any = {
  };

  if (fetchData.token) {
    reqHeaders = {
      ...reqHeaders, Authorization:
        `Bearer ${fetchData.token}`
    }
  };

  if (fetchData.headers) {
    reqHeaders = { ...reqHeaders, ...fetchData.headers };
  }

  let config: any = {
    method: fetchData.method,
    url: `${endpoint}${fetchData.url}`,
    headers: reqHeaders,
    withCredentials: true,
    maxRedirects: 0,
  };

  if (fetchData.params && Object.keys(fetchData.params).length > 0) {
    if (fetchData.method === 'post') {
      config = { ...config, data: fetchData.params };
    } else {
      config = { ...config, params: fetchData.params };
    }
  }

  if (fetchData.signal) {
    config = { ...config, signal: fetchData.signal };
  }

  config = {
    ...config,
    validateStatus: (status: any) => {
      // console.log('status code', status);
      return true;
    },
  };

  let response: any = null;

  // console.log('axios config', config);

  try {
    response = await axios(config);
  } catch (error: any) {
    console.log('fetch error', error.response?.status);

    response = error.response;
  }

  return response;
};

