import React from 'react';

import { Dialog, DialogContent, DialogActions, TextField, Button } from '@mui/material';

import { MUI_EMPTY_INPUT_HELPER_TEXT } from '../common/constants';
import * as utils from '../common/utils';

interface ISingleFieldDialogProps {
  open: boolean;
  type?: 'text' | 'password';
  label: string;
  error?: boolean;
  helperText?: string;
  maxLength: number;
  value: string;
  onChange: (value: string) => void;
  onEnter?: () => void;
  onClose: () => void;
  onConfirm: () => void;
}

type SingleFieldDialogProps = ISingleFieldDialogProps;

export default function SingleFieldDialog(props: SingleFieldDialogProps) {
  const {
    open,
    type = 'text',
    label,
    error = false,
    helperText = MUI_EMPTY_INPUT_HELPER_TEXT,
    maxLength,
    value,
    onChange,
    onEnter,
    onClose,
    onConfirm,
  } = props;

  return (
    <Dialog open={open} fullWidth>
      <DialogContent>
        <TextField
          autoFocus
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          autoSave="off"
          type={type}
          label={label}
          fullWidth
          margin="normal"
          error={error}
          helperText={error ? helperText : MUI_EMPTY_INPUT_HELPER_TEXT}
          value={value}
          onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            onChange(event.target.value);
          }}
          inputProps={{
            autoComplete: 'off',
            autoCapitalize: 'off',
            autoCorrect: 'off',
            autoSave: 'off',
            maxLength: maxLength,
            onKeyUp: (event: React.KeyboardEvent) => {
              if (event.key === 'Enter' && utils.isFunction(onEnter)) {
                onEnter();
              }
            },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{utils.getI18NMessage('BUTTON_CANCEL')}</Button>
        <Button onClick={onConfirm}>{utils.getI18NMessage('BUTTON_CONFIRM')}</Button>
      </DialogActions>
    </Dialog>
  );
}
