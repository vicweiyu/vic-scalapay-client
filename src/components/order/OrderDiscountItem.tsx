import React from 'react';

import { TextField } from '@mui/material';

import * as utils from '../../common/utils';

import { Amount } from '../../components';
import { UseInputProps } from '../../hooks';

interface IOrderDiscountItemProps {
  displayNameInputProps: Pick<UseInputProps, Exclude<keyof UseInputProps, 'tools'>>;

  amountInputProps: Pick<UseInputProps, Exclude<keyof UseInputProps, 'tools'>>;
}

type OrderDiscountItemProps = IOrderDiscountItemProps;

export default function OrderDiscountItem(props: OrderDiscountItemProps) {
  return (
    <div className="comp-info">
      <Amount amountInputProps={props.amountInputProps} />

      <TextField
        type="text"
        label={utils.getI18NMessage('DISCOUNT_ITEM_DISPLAYNAME_LABEL')}
        fullWidth
        margin="normal"
        {...props.displayNameInputProps}
      />
    </div>
  );
}
