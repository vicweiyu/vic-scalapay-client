import React from 'react';

import { Dialog, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

import * as utils from '../common/utils';

interface IDoubleActionDialogProps {
  open: boolean;
  message: string;
  btnText1?: string;
  onClickBtn1: () => void;
  btnText2?: string;
  onClickBtn2: () => void;
}

type DoubleActionDialogProps = IDoubleActionDialogProps;

export default function DoubleActionDialog(props: DoubleActionDialogProps) {
  const {
    open,
    message,
    btnText1 = utils.getI18NMessage('BUTTON_CANCEL'),
    onClickBtn1,
    btnText2 = utils.getI18NMessage('BUTTON_CONFIRM'),
    onClickBtn2,
  } = props;

  return (
    <Dialog open={open} fullWidth>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClickBtn1}>{btnText1}</Button>
        <Button onClick={onClickBtn2}>{btnText2}</Button>
      </DialogActions>
    </Dialog>
  );
}
