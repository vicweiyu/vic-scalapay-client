import { configureStore } from '@reduxjs/toolkit';

import { IS_MOCK, IS_SIT, IS_SHOW_LOG } from '../common/constants';

import appReducer from './appSlice';
import orderReducer from './orderSlice';

const store = configureStore({
  reducer: {
    app: appReducer,
    order: orderReducer,
  },
  devTools: IS_MOCK || IS_SIT || IS_SHOW_LOG,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false, // TODO
    });
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
