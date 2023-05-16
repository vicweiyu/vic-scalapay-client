import { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';

import {
  API_PATH_USERS_REGISTER,
  API_PATH_USERS_LOGIN,
  API_PATH_USERS_CHANGE_PWD,
  API_PATH_ORDERS_SUBMIT,
} from '../src/common/constants';

// API - users
import register_res from './users/register_res.json';
import login_res from './users/login_res.json';
import change_pwd_res from './users/change_pwd_res.json';
// API - orders
import submit_order_res from './orders/submit_order_res.json';

let mock: MockAdapter;

const setupMock = (instance: AxiosInstance) => {
  mock = new MockAdapter(instance, { delayResponse: 1 * 1000 });

  // API - users
  mock.onPost(API_PATH_USERS_REGISTER).reply(200, register_res);
  mock.onPost(API_PATH_USERS_LOGIN).reply(200, login_res);
  mock.onPost(API_PATH_USERS_CHANGE_PWD).reply(200, change_pwd_res);

  // API - orders
  mock.onPost(API_PATH_ORDERS_SUBMIT).reply(200, submit_order_res);
};

export default setupMock;
