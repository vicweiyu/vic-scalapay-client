export const IS_MOCK = false; // Set to false in Production
export const IS_SIT = false; // Set to false in Production
export const IS_SHOW_LOG = true; // Set to false in Production

export const TOAST_DEFAULT_MARGIN_TOP = '12.5rem';
export const TOAST_DURATION_NORMAL = 3 * 1000;

export const MUI_DRAWER_WIDTH = 240;
export const MUI_EMPTY_INPUT_HELPER_TEXT = ' ';

export enum E_LOG_LEVEL {
  'log',
  'warn',
  'error',
}

// Scalapay Start
export enum E_SCALAPAY_GTIN {
  UPC = 'UPC',
  EAN = 'EAN',
  JAN = 'JAN',
  ISBN = 'ISBN',
  ITF_14 = 'ITF-14',
}

export enum E_SCALAPAY_CURRENCY {
  EUR = 'EUR',
}

export enum E_SCALAPAY_TYPE {
  ONLINE = 'online',
  OFFLINE = 'offline',
}

export enum E_SCALAPAY_PRODUCT {
  PAY_IN_3 = 'pay-in-3',
  PAY_IN_4 = 'pay-in-4',
  PAY_LATER = 'later',
}

export enum E_SCALAPAY_FREQUENCY_TYPE {
  MONTHLY = 'monthly',
}
// Scalapay End

// Route
export const ROUTE_LOGIN = '/';
export const ROUTE_LOGOUT = '/logout';
export const ROUTE_REGISTRATION = '/registration';
export const ROUTE_REGISTRATION_SUCC = ROUTE_REGISTRATION + '/success';

export const ROUTE_MAIN = '/main';
export const ROUTE_HOME = ROUTE_MAIN + '/home';
export const ROUTE_ORDER = ROUTE_MAIN + '/order';

export const API_PRD_SERVER_URL = 'http://127.0.0.1:8000';
export const API_DEV_SERVER_URL = 'http://127.0.0.1:8001';
export const API_BASE_PATH = '/api';
export const API_COMMUNICATION_TIMEOUT = 10 * 1000;
export const CLIENT_CHANNEL = 'web';

// API - users
export const API_PATH_USERS_REGISTER = '/users/register';
export const API_PATH_USERS_LOGIN = '/users/login';
export const API_PATH_USERS_CHANGE_PWD = '/users/changePassword';

// API - orders
export const API_PATH_ORDERS_SUBMIT = '/orders/submitOrder';
