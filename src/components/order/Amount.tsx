import React from 'react';

import { TextField } from '@mui/material';

import { MUI_EMPTY_INPUT_HELPER_TEXT, E_SCALAPAY_CURRENCY } from '../../common/constants';
import * as utils from '../../common/utils';

import { UseInputProps } from '../../hooks';

interface IAmountProps {
  amountInputProps: Pick<UseInputProps, Exclude<keyof UseInputProps, 'tools'>>;
}

type AmountProps = IAmountProps;

export default function Amount(props: AmountProps) {
  return (
    <div className="comp-amount">
      <TextField
        type="text"
        label={utils.getI18NMessage('AMOUNT_AMOUNT_LABEL')}
        fullWidth
        margin="normal"
        {...props.amountInputProps}
      />

      <TextField
        type="text"
        label={utils.getI18NMessage('AMOUNT_CURRENCY_LABEL')}
        fullWidth
        margin="normal"
        value={E_SCALAPAY_CURRENCY.EUR}
        error={false}
        helperText={MUI_EMPTY_INPUT_HELPER_TEXT}
        InputProps={{
          readOnly: true,
        }}
      />
    </div>
  );
}
