import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';

import {
  IS_MOCK,
  IS_SIT,
  API_PRD_SERVER_URL,
  API_DEV_SERVER_URL,
  API_BASE_PATH,
  API_COMMUNICATION_TIMEOUT,
  CLIENT_CHANNEL,
} from './constants';
import * as utils from './utils';

import store from '../redux/storeConfig';

import setupMock from '../../mock'; // TODO

let instance: AxiosInstance;

const getWSInstance = (): AxiosInstance => {
  if (utils.isUndefined(instance)) {
    instance = axios.create({
      baseURL: (IS_SIT ? API_DEV_SERVER_URL : API_PRD_SERVER_URL) + API_BASE_PATH,
      timeout: API_COMMUNICATION_TIMEOUT,
      headers: { channel: CLIENT_CHANNEL },
      responseType: 'json',
      responseEncoding: 'utf8',
      decompress: true,
      validateStatus: (status: number) => {
        return status >= 200 && status < 300;
      },
    });

    instance.interceptors.request.use(reqOnFulfilledInterceptor, reqOnRejectedInterceptor);

    instance.interceptors.response.use(resOnFulfilledInterceptor, resOnRejectedInterceptor);

    if (IS_MOCK) {
      setupMock(instance);
    }
  }

  return instance;
};

const reqOnFulfilledInterceptor = (config: InternalAxiosRequestConfig) => {
  const { jwt = '' } = store.getState().app;
  if (!utils.isEmptyString(jwt)) {
    config.headers['Authorization'] = `Bearer ${jwt}`;
  } else {
    config.headers['Authorization'] = '';
  }

  return config;
};

const reqOnRejectedInterceptor = (error: any) => {
  // TODO
  return Promise.reject(error);
};

const resOnFulfilledInterceptor = (res: AxiosResponse) => {
  // TODO
  return res;
};

const resOnRejectedInterceptor = (error: any) => {
  // TODO
  return Promise.reject(error);
};

const httpGet = (path: string, params?: any): Promise<AxiosResponse> => {
  if (params) {
    return getWSInstance().get(path, { params });
  } else {
    return getWSInstance().get(path);
  }
};

const httpDelete = (path: string, params?: any): Promise<AxiosResponse> => {
  if (params) {
    return getWSInstance().delete(path, { params });
  } else {
    return getWSInstance().delete(path);
  }
};

const httpPost = (path: string, params?: any): Promise<AxiosResponse> => {
  if (params) {
    return getWSInstance().post(path, qs.stringify(params));
  } else {
    return getWSInstance().post(path);
  }
};

const httpPut = (path: string, params?: any): Promise<AxiosResponse> => {
  if (params) {
    return getWSInstance().put(path, qs.stringify(params));
  } else {
    return getWSInstance().put(path);
  }
};

const httpPatch = (path: string, params?: any): Promise<AxiosResponse> => {
  if (params) {
    return getWSInstance().patch(path, qs.stringify(params));
  } else {
    return getWSInstance().patch(path);
  }
};

const isSuccess = (res: AxiosResponse) => {
  return res.data.code === '0';
};

const getWSErrorMsg = (res: AxiosResponse) => {
  const { code, message } = res.data;

  if (!utils.isEmptyString(code) && !utils.isEmptyString(message) && code !== '0') {
    return `${message} (${code})`;
  }

  return utils.getI18NError('F1000');
};

export { httpGet, httpDelete, httpPost, httpPut, httpPatch, isSuccess, getWSErrorMsg };
