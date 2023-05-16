import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import { Backdrop, CircularProgress } from '@mui/material';

import * as utils from '../common/utils';

import { DoubleActionDialog, SingleActionDialog, Toast } from '../components';

import { RootState } from '../redux/storeConfig';

export default function PageTools() {
  const {
    isToastOpen,
    toastMsg,
    toastSeverity,

    isLoading,

    isSingleActionOpen,
    singleActionMsg,
    singleActionBtnText,
    onClickSingleAction,

    isDoubleActionOpen,
    doubleActionMsg,
    doubleActionBtnText1,
    onClickDoubleAction1,
    doubleActionBtnText2,
    onClickDoubleAction2,
  } = useSelector((state: RootState) => state.app, shallowEqual);

  return (
    <>
      <Backdrop className="app-backdrop" open={isLoading}>
        <CircularProgress color="primary" />
      </Backdrop>

      <Toast message={toastMsg} severity={toastSeverity} open={isToastOpen} onClose={utils.hideToast} />

      <SingleActionDialog
        open={isSingleActionOpen}
        message={singleActionMsg}
        btnText={singleActionBtnText}
        onClickBtn={onClickSingleAction}
      />

      <DoubleActionDialog
        open={isDoubleActionOpen}
        message={doubleActionMsg}
        btnText1={doubleActionBtnText1}
        onClickBtn1={onClickDoubleAction1}
        btnText2={doubleActionBtnText2}
        onClickBtn2={onClickDoubleAction2}
      />
    </>
  );
}
