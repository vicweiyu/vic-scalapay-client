import { API_PATH_USERS_REGISTER, API_PATH_USERS_LOGIN, API_PATH_USERS_CHANGE_PWD } from '../common/constants';
import { httpPost, httpPatch, isSuccess, getWSErrorMsg } from '../common/ws';

const register = async (username: string, password: string) => {
  const res = await httpPost(API_PATH_USERS_REGISTER, { username, password });

  if (isSuccess(res)) {
    return;
  } else {
    throw new Error(getWSErrorMsg(res));
  }
};

const login = async (username: string, password: string) => {
  const res = await httpPost(API_PATH_USERS_LOGIN, { username, password });

  if (isSuccess(res)) {
    return {
      jwt: res.data.data.token,
    };
  } else {
    throw new Error(getWSErrorMsg(res));
  }
};

// TODO
const changePwd = async (newPwd: string) => {
  const res = await httpPatch(API_PATH_USERS_CHANGE_PWD, { password: newPwd });

  if (isSuccess(res)) {
    return;
  } else {
    throw new Error(getWSErrorMsg(res));
  }
};

export { login, register, changePwd };
