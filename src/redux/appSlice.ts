import { createSlice } from '@reduxjs/toolkit';

interface IAppState {
  isToastOpen: boolean;
  toastMsg: string;
  toastSeverity: 'success' | 'info' | 'warning' | 'error';

  isLoading: boolean;

  isSingleActionOpen: boolean;
  singleActionMsg: string;
  singleActionBtnText: string;
  onClickSingleAction: () => void;

  isDoubleActionOpen: boolean;
  doubleActionMsg: string;
  doubleActionBtnText1: string;
  onClickDoubleAction1: () => void;
  doubleActionBtnText2: string;
  onClickDoubleAction2: () => void;

  channel: 'web' | 'mobile';
  jwt: string;
}

const initialState: IAppState = {
  isToastOpen: false,
  toastMsg: '',
  toastSeverity: 'info',

  isLoading: false,

  isSingleActionOpen: false,
  singleActionMsg: '',
  singleActionBtnText: '',
  onClickSingleAction: () => {},

  isDoubleActionOpen: false,
  doubleActionMsg: '',
  doubleActionBtnText1: '',
  onClickDoubleAction1: () => {},
  doubleActionBtnText2: '',
  onClickDoubleAction2: () => {},

  channel: 'web',
  jwt: '',
};

const appSlice = createSlice({
  name: 'app',

  initialState: initialState,

  reducers: {
    showToast(state, action) {
      const { toastMsg, toastSeverity = 'info' } = action.payload;

      state.isToastOpen = true;
      state.toastMsg = toastMsg;
      state.toastSeverity = toastSeverity;
    },

    hideToast(state, action) {
      state.isToastOpen = false;
      state.toastMsg = '';
      state.toastSeverity = 'info';
    },

    showLoading(state, action) {
      state.isLoading = true;
    },

    hideLoading(state, action) {
      state.isLoading = false;
    },

    popupSingleActionDialog(state, action) {
      const { singleActionMsg, singleActionBtnText, onClickSingleAction } = action.payload;

      state.isSingleActionOpen = true;
      state.singleActionMsg = singleActionMsg;
      state.singleActionBtnText = singleActionBtnText;
      state.onClickSingleAction = onClickSingleAction;
    },

    closeSingleActionDialog(state, action) {
      state.isSingleActionOpen = false;
      state.singleActionMsg = '';
      state.singleActionBtnText = '';
      state.onClickSingleAction = () => {};
    },

    popupDoubleActionDialog(state, action) {
      const {
        doubleActionMsg,
        doubleActionBtnText1,
        onClickDoubleAction1,
        doubleActionBtnText2,
        onClickDoubleAction2,
      } = action.payload;

      state.isDoubleActionOpen = true;
      state.doubleActionMsg = doubleActionMsg;
      state.doubleActionBtnText1 = doubleActionBtnText1;
      state.onClickDoubleAction1 = onClickDoubleAction1;
      state.doubleActionBtnText2 = doubleActionBtnText2;
      state.onClickDoubleAction2 = onClickDoubleAction2;
    },

    closeDoubleActionDialog(state, action) {
      state.isDoubleActionOpen = false;
      state.doubleActionMsg = '';
      state.doubleActionBtnText1 = '';
      state.onClickDoubleAction1 = () => {};
      state.doubleActionBtnText2 = '';
      state.onClickDoubleAction2 = () => {};
    },

    saveCredential(state, action) {
      const { jwt = '' } = action.payload;

      state.jwt = jwt;

      // TODO - Save JWT in Local Storage
    },

    removeCredential(state, action) {
      state.jwt = '';

      // TODO - Remove JWT from Local Storage
    },
  },
});

export type AppState = IAppState;

export const {
  showToast,
  hideToast,
  showLoading,
  hideLoading,
  popupSingleActionDialog,
  closeSingleActionDialog,
  popupDoubleActionDialog,
  closeDoubleActionDialog,
  saveCredential,
  removeCredential,
} = appSlice.actions;

export default appSlice.reducer;
