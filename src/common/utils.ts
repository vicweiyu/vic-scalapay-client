import { IS_SHOW_LOG, E_LOG_LEVEL, ROUTE_HOME, ROUTE_ORDER } from './constants';
import { i18n_en_AU } from './i18n';

import store from '../redux/storeConfig';
import {
  showToast as showToastAction,
  hideToast as hideToastAction,
  showLoading as showLoadingAction,
  hideLoading as hideLoadingAction,
  popupSingleActionDialog as popupSingleActionDialogAction,
  closeSingleActionDialog as closeSingleActionDialogAction,
  popupDoubleActionDialog as popupDoubleActionDialogAction,
  closeDoubleActionDialog as closeDoubleActionDialogAction,
} from '../redux/appSlice';

const printLog = (s: string, level: E_LOG_LEVEL = E_LOG_LEVEL.log) => {
  if (!IS_SHOW_LOG) {
    return;
  }

  switch (level) {
    case E_LOG_LEVEL.log:
      console.log(s);
      break;
    case E_LOG_LEVEL.warn:
      console.warn(s);
      break;
    case E_LOG_LEVEL.error:
      console.error(s);
      break;
    default:
      console.info(s);
  }
};

export const log = (s: string) => {
  printLog(s, E_LOG_LEVEL.log);
};

export const warn = (s: string) => {
  printLog(s, E_LOG_LEVEL.warn);
};

export const error = (s: string) => {
  printLog(s, E_LOG_LEVEL.error);
};

export const info = (...p: any[]) => {
  console.info(p);
};

export const printTSError = (e: unknown) => {
  if (typeof e === 'object' && typeof (e as Error).message !== 'undefined') {
    printLog((e as Error).message, E_LOG_LEVEL.error);
  } else {
    printLog(String(e), E_LOG_LEVEL.error);
  }
};

export const isEmptyString = (s: string) => !(s !== undefined && s !== null && s !== '');

export const isEmptyArray = (arr: Array<any>) => !(arr && arr.length > 0);

export const isUndefined = (val: any) => val === undefined;

export const isNull = (val: any) => val === null;

export const isFunction = (val: any) => typeof val === 'function';

let STANDARD_1_REM = 16;

export const getStandard1Rem = () => {
  return STANDARD_1_REM;
};

export const matchSmallScreen = () => {
  let clientWidth = document.body.clientWidth;
  if (clientWidth <= 340) {
    STANDARD_1_REM = 12; // @global-font-size-xsmall
  } else if (clientWidth <= 360) {
    STANDARD_1_REM = 14; // @global-font-size-small
  }
};

export const isTablet = (): boolean => {
  return (
    (document.body.clientWidth >= 768 && document.body.clientHeight >= 1024) ||
    (document.body.clientWidth >= 1024 && document.body.clientHeight >= 768)
  );
};

export const isLongScreen = (): boolean => {
  return (
    document.body.clientWidth >= 360 &&
    document.body.clientHeight >= 800 &&
    document.body.clientWidth / document.body.clientHeight <= 0.462
  );
};

export const isLandscape = (): boolean => {
  return document.documentElement.clientWidth > document.documentElement.clientHeight;
};

export const getI18NMessage = (key: string) => {
  if (isEmptyString(key)) {
    return '';
  }

  const text = i18n_en_AU.messages.get(key);
  return isEmptyString(text) ? '' : text;
};

export const getI18NError = (errorCode: string) => {
  if (isEmptyString(errorCode)) {
    return i18n_en_AU.errors.get('F1000');
  }

  const text = i18n_en_AU.errors.get(errorCode.startsWith('F1') ? 'F1000' : errorCode);
  if (isEmptyString(text)) {
    return `${i18n_en_AU.errors.get('F1000')} (code: ${errorCode})`;
  } else {
    return `${text} (code: ${errorCode})`;
  }
};

export const isValidatedEmail = (email: string) => {
  return !isEmptyString(email) && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

export const isValidatedPassword = (password: string) => {
  // Password between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character
  return !isEmptyString(password) && /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(password);
};

export const getTitleByMenu = (route: string) => {
  let title = '';

  switch (route) {
    case ROUTE_HOME:
      title = getI18NMessage('MENU_HOME');
      break;
    case ROUTE_ORDER:
      title = getI18NMessage('MENU_ORDER');
      break;
    default:
      title = '';
  }

  return title;
};

// Toolize Redux Actions - Start
export const showToast = (toastMsg: string, toastSeverity: 'success' | 'info' | 'warning' | 'error' = 'info') => {
  store.dispatch(showToastAction({ toastMsg, toastSeverity }));
};

export const hideToast = () => {
  store.dispatch(hideToastAction({}));
};

export const showLoading = () => {
  store.dispatch(showLoadingAction({}));
};

export const hideLoading = () => {
  store.dispatch(hideLoadingAction({}));
};

export const popupSingleActionDialog = (
  singleActionMsg: string,
  singleActionBtnText: string,
  onClickSingleAction: () => void
) => {
  store.dispatch(popupSingleActionDialogAction({ singleActionMsg, singleActionBtnText, onClickSingleAction }));
};

export const closeSingleActionDialog = () => {
  store.dispatch(closeSingleActionDialogAction({}));
};

export const popupDoubleActionDialog = (
  doubleActionMsg: string,
  doubleActionBtnText1: string,
  onClickDoubleAction1: () => void,
  doubleActionBtnText2: string,
  onClickDoubleAction2: () => void
) => {
  store.dispatch(
    popupDoubleActionDialogAction({
      doubleActionMsg,
      doubleActionBtnText1,
      onClickDoubleAction1,
      doubleActionBtnText2,
      onClickDoubleAction2,
    })
  );
};

export const closeDoubleActionDialog = () => {
  store.dispatch(closeDoubleActionDialogAction({}));
};
// Toolize Redux Actions - End
