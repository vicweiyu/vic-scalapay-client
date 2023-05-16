import React from 'react';

import { Dialog, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

import * as utils from '../common/utils';

interface ISingleActionDialogProps {
  open: boolean;
  message: string;
  btnText?: string;
  onClickBtn: () => void;
}

type SingleActionDialogProps = ISingleActionDialogProps;

export default function SingleActionDialog(props: SingleActionDialogProps) {
  const { open, message, btnText = utils.getI18NMessage('BUTTON_OK'), onClickBtn } = props;

  return (
    <Dialog open={open} fullWidth>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClickBtn}>{btnText}</Button>
      </DialogActions>
    </Dialog>
  );
}
