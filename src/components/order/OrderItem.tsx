import React from 'react';

import { TextField } from '@mui/material';

import * as utils from '../../common/utils';

import { Amount } from '../../components';
import { UseInputProps } from '../../hooks';

interface IOrderItemProps {
  gtinInputProps: Pick<UseInputProps, Exclude<keyof UseInputProps, 'tools'>>;
  quantityInputProps: Pick<UseInputProps, Exclude<keyof UseInputProps, 'tools'>>;
  nameInputProps: Pick<UseInputProps, Exclude<keyof UseInputProps, 'tools'>>;
  categoryInputProps: Pick<UseInputProps, Exclude<keyof UseInputProps, 'tools'>>;
  subcategoryInputProps: Pick<UseInputProps, Exclude<keyof UseInputProps, 'tools'>>;
  skuInputProps: Pick<UseInputProps, Exclude<keyof UseInputProps, 'tools'>>;
  brandInputProps: Pick<UseInputProps, Exclude<keyof UseInputProps, 'tools'>>;

  amountInputProps: Pick<UseInputProps, Exclude<keyof UseInputProps, 'tools'>>;
}

type OrderItemProps = IOrderItemProps;

export default function OrderItem(props: OrderItemProps) {
  return (
    <div className="comp-info">
      <TextField
        type="text"
        label={utils.getI18NMessage('ITEM_GTIN_LABEL')}
        fullWidth
        margin="normal"
        {...props.gtinInputProps}
      />

      <TextField
        type="text"
        label={utils.getI18NMessage('ITEM_QUANTITY_LABEL')}
        fullWidth
        margin="normal"
        {...props.quantityInputProps}
      />

      <Amount amountInputProps={props.amountInputProps} />

      <TextField
        type="text"
        label={utils.getI18NMessage('ITEM_NAME_LABEL')}
        fullWidth
        margin="normal"
        {...props.nameInputProps}
      />

      <TextField
        type="text"
        label={utils.getI18NMessage('ITEM_CATEGORY_LABEL')}
        fullWidth
        margin="normal"
        {...props.categoryInputProps}
      />

      <TextField
        type="text"
        label={utils.getI18NMessage('ITEM_SUBCATEGORY_LABEL')}
        fullWidth
        margin="normal"
        {...props.subcategoryInputProps}
      />

      <TextField
        type="text"
        label={utils.getI18NMessage('ITEM_SKU_LABEL')}
        fullWidth
        margin="normal"
        {...props.skuInputProps}
      />

      <TextField
        type="text"
        label={utils.getI18NMessage('ITEM_BRAND_LABEL')}
        fullWidth
        margin="normal"
        {...props.brandInputProps}
      />
    </div>
  );
}
