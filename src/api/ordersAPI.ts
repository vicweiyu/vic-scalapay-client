import { API_PATH_ORDERS_SUBMIT } from '../common/constants';
import { httpPost, isSuccess, getWSErrorMsg } from '../common/ws';

import { Order } from '../model';

const submitOrder = async (order: Order) => {
  const res = await httpPost(API_PATH_ORDERS_SUBMIT, { ...order });

  if (isSuccess(res)) {
    return res.data.data.spRes;
  } else {
    throw new Error(getWSErrorMsg(res));
  }
};

export { submitOrder };
