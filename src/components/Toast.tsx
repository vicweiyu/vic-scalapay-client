import React from 'react';

import { Snackbar, SnackbarOrigin, Alert, AlertColor } from '@mui/material';

import { TOAST_DEFAULT_MARGIN_TOP, TOAST_DURATION_NORMAL } from '../common/constants';

interface IToastProps {
  style?: React.CSSProperties;
  anchorOrigin?: SnackbarOrigin;
  autoHideDuration?: number;
  message: string;
  severity: AlertColor;
  open: boolean;
  onClose: () => void;
}

type ToastProps = IToastProps;

export default function Toast(props: ToastProps) {
  const {
    style = { marginTop: TOAST_DEFAULT_MARGIN_TOP },
    anchorOrigin = { vertical: 'top', horizontal: 'center' },
    autoHideDuration = TOAST_DURATION_NORMAL,
    message,
    severity,
    open,
    onClose,
  } = props;

  return (
    <Snackbar
      style={style}
      anchorOrigin={anchorOrigin}
      autoHideDuration={autoHideDuration}
      open={open}
      onClose={onClose}
    >
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
}
