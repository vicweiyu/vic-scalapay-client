import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { Button, Divider, Typography } from '@mui/material';

import { MUI_EMPTY_INPUT_HELPER_TEXT, E_SCALAPAY_CURRENCY } from '../../common/constants';
import * as utils from '../../common/utils';

import { OrderItem } from '../../components';
import { useInput } from '../../hooks';

import { RootState } from '../../redux/storeConfig';
import { saveNewItem } from '../../redux/orderSlice';

import OrderStepperOper from './OrderStepperOper';

interface IOrderItemsProps {
  activeStep: number;
  stepsLength: number;
  back: () => void;
  next: () => void;
}

type OrderItemsProps = IOrderItemsProps;

export default function OrderItems(props: OrderItemsProps) {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.order, shallowEqual);

  const { activeStep, stepsLength, back, next } = props;

  const { tools: gtinTools, ...gtinInputProps } = useInput('', MUI_EMPTY_INPUT_HELPER_TEXT);
  const { tools: quantityTools, ...quantityInputProps } = useInput('', MUI_EMPTY_INPUT_HELPER_TEXT);
  const { tools: nameTools, ...nameInputProps } = useInput('', MUI_EMPTY_INPUT_HELPER_TEXT);
  const { tools: categoryTools, ...categoryInputProps } = useInput('', MUI_EMPTY_INPUT_HELPER_TEXT);
  const { tools: subcategoryTools, ...subcategoryInputProps } = useInput('', MUI_EMPTY_INPUT_HELPER_TEXT);
  const { tools: skuTools, ...skuInputProps } = useInput('', MUI_EMPTY_INPUT_HELPER_TEXT);
  const { tools: brandTools, ...brandInputProps } = useInput('', MUI_EMPTY_INPUT_HELPER_TEXT);

  const { tools: amountTools, ...amountInputProps } = useInput('', MUI_EMPTY_INPUT_HELPER_TEXT);

  const orderItemProps = {
    gtinInputProps,
    quantityInputProps,
    nameInputProps,
    categoryInputProps,
    subcategoryInputProps,
    skuInputProps,
    brandInputProps,
    amountInputProps,
  };

  const onClickAdd = () => {
    let isInputErr = false;

    if (utils.isEmptyString(quantityInputProps.value)) {
      quantityTools.setError(true);
      quantityTools.setHelperText(utils.getI18NError('F2108'));
      isInputErr = true;
    }

    if (utils.isEmptyString(amountInputProps.value)) {
      amountTools.setError(true);
      amountTools.setHelperText(utils.getI18NError('F2109'));
      isInputErr = true;
    }

    if (utils.isEmptyString(nameInputProps.value)) {
      nameTools.setError(true);
      nameTools.setHelperText(utils.getI18NError('F2110'));
      isInputErr = true;
    }

    if (utils.isEmptyString(categoryInputProps.value)) {
      categoryTools.setError(true);
      categoryTools.setHelperText(utils.getI18NError('F2111'));
      isInputErr = true;
    }

    if (utils.isEmptyString(skuInputProps.value)) {
      skuTools.setError(true);
      skuTools.setHelperText(utils.getI18NError('F2112'));
      isInputErr = true;
    }

    if (isInputErr) {
      return;
    }

    dispatch(
      saveNewItem({
        gtin: gtinInputProps.value,
        quantity: quantityInputProps.value,
        price: { amount: amountInputProps.value, currency: E_SCALAPAY_CURRENCY.EUR },
        name: nameInputProps.value,
        category: categoryInputProps.value,
        subcategory: [subcategoryInputProps.value], // TODO
        sku: skuInputProps.value,
        brand: brandInputProps.value,
      })
    );
  };

  const handleBack = () => {
    back();
  };

  const handleNext = () => {
    next();
  };

  return (
    <div className="order-items-page">
      <OrderItem {...orderItemProps} />
      <div className="items-btn">
        <Button variant="contained" fullWidth onClick={onClickAdd}>
          {utils.getI18NMessage('BUTTON_ADD')}
        </Button>
      </div>

      <Divider />

      <Typography className="items-content">
        {`${utils.getI18NMessage('ORDER_ITEMS_CONTENT_PART1')}${items.length}${utils.getI18NMessage(
          'ORDER_ITEMS_CONTENT_PART2'
        )}`}
      </Typography>

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
