import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { Divider, Typography } from '@mui/material';

import { MUI_EMPTY_INPUT_HELPER_TEXT, E_SCALAPAY_CURRENCY } from '../../common/constants';
import * as utils from '../../common/utils';

import { OrderDiscountItem, Amount } from '../../components';
import { useInput } from '../../hooks';

import { RootState } from '../../redux/storeConfig';
import { saveNewDiscount, saveShippingAmount, saveTaxAmount } from '../../redux/orderSlice';

import OrderStepperOper from './OrderStepperOper';

interface IOrderDiscountItemsProps {
  activeStep: number;
  stepsLength: number;
  back: () => void;
  next: () => void;
}

type OrderDiscountItemsProps = IOrderDiscountItemsProps;

export default function OrderDiscountItems(props: OrderDiscountItemsProps) {
  const dispatch = useDispatch();
  const { discounts, shippingAmount, taxAmount } = useSelector((state: RootState) => state.order, shallowEqual);

  const { activeStep, stepsLength, back, next } = props;

  const { tools: displayNameTools, ...displayNameInputProps } = useInput('', MUI_EMPTY_INPUT_HELPER_TEXT);
  const { tools: amountTools, ...amountInputProps } = useInput('', MUI_EMPTY_INPUT_HELPER_TEXT);

  const { tools: shippingAmountTools, ...shippingAmountInputProps } = useInput(
    shippingAmount?.amount ? shippingAmount?.amount : '',
    MUI_EMPTY_INPUT_HELPER_TEXT
  );

  const { tools: taxAmountTools, ...taxAmountInputProps } = useInput(
    taxAmount?.amount ? taxAmount.amount : '',
    MUI_EMPTY_INPUT_HELPER_TEXT
  );

  const handleBack = () => {
    back();
  };

  const handleNext = () => {
    dispatch(
      saveNewDiscount({
        amount: amountInputProps.value,
        currency: E_SCALAPAY_CURRENCY.EUR,
        displayName: displayNameInputProps.value,
      })
    );

    dispatch(
      saveShippingAmount({
        amount: shippingAmountInputProps.value,
      })
    );

    dispatch(
      saveTaxAmount({
        amount: taxAmountInputProps.value,
      })
    );

    next();
  };

  return (
    <div className="order-discounts-fee-page">
      <Typography className="section-title">{utils.getI18NMessage('ORDER_DISCOUNTS_ITLE')}</Typography>

      <OrderDiscountItem displayNameInputProps={displayNameInputProps} amountInputProps={amountInputProps} />

      <Divider />

      <Typography className="section-title">{utils.getI18NMessage('ORDER_SHIPPING_AMOUNT_TITLE')}</Typography>
      <Amount amountInputProps={shippingAmountInputProps} />

      <Divider />

      <Typography className="section-title">{utils.getI18NMessage('ORDER_TAX_AMOUNT_TITLE')}</Typography>
      <Amount amountInputProps={taxAmountInputProps} />

      <Divider />

      <OrderStepperOper
        activeStep={activeStep}
        stepsLength={stepsLength}
        handleBack={handleBack}
        handleNext={handleNext}
      />
    </div>
  );
}
