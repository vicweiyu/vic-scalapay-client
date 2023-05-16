import React, { useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import {
  Stepper,
  Step,
  StepLabel,
  Typography,
  Divider,
  Select,
  SelectChangeEvent,
  MenuItem,
  TextField,
} from '@mui/material';

import { MUI_EMPTY_INPUT_HELPER_TEXT, E_SCALAPAY_PRODUCT, E_SCALAPAY_FREQUENCY_TYPE } from '../../common/constants';
import * as utils from '../../common/utils';

import { RootState } from '../../redux/storeConfig';
import { saveProduct, saveFrequency } from '../../redux/orderSlice';

import OrderConsumer from './OrderConsumer';
import OrderShipping from './OrderShipping';
import OrderBilling from './OrderBilling';
import OrderItems from './OrderItems';
import OrderDiscountsFee from './OrderDiscountsFee';
import OrderStepperOper from './OrderStepperOper';

import { submitOrder } from '../../api';

const steps = [
  utils.getI18NMessage('ORDER_STEP_1'),
  utils.getI18NMessage('ORDER_STEP_2'),
  utils.getI18NMessage('ORDER_STEP_3'),
  utils.getI18NMessage('ORDER_STEP_4'),
  utils.getI18NMessage('ORDER_STEP_5'),
  utils.getI18NMessage('ORDER_STEP_6'),
];

export default function Order() {
  const dispatch = useDispatch();
  const order = useSelector((state: RootState) => state.order, shallowEqual);

  const [activeStep, setActiveStep] = useState(0);

  const handleChangeProduct = (event: SelectChangeEvent) => {
    dispatch(
      saveProduct({
        product: event.target.value as string,
      })
    );
  };

  const back = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const next = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleSubmit = async () => {
    dispatch(
      saveFrequency({
        number: 1, // TODO
      })
    );

    try {
      // console.log(order);

      utils.showLoading();
      const result = await submitOrder(order);
      utils.hideLoading();

      next();

      window.open(result.checkoutUrl, '_blank');
    } catch (e) {
      utils.hideLoading();

      utils.showToast((e as Error).message, 'error');
    }
  };

  return (
    <div className="order-page">
      <div className="order-stepper">
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: { optional?: React.ReactNode } = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </div>

      {activeStep === 0 && (
        <div className="order-sector">
          <Typography className="section-title">{utils.getI18NMessage('ORDER_CONSUMER_TITLE')}</Typography>
          <OrderConsumer activeStep={activeStep} stepsLength={steps.length} back={back} next={next} />
        </div>
      )}

      {activeStep === 1 && (
        <div className="order-sector">
          <Typography className="section-title">{utils.getI18NMessage('ORDER_SHIPPING_TITLE')}</Typography>
          <OrderShipping activeStep={activeStep} stepsLength={steps.length} back={back} next={next} />
        </div>
      )}

      {activeStep === 2 && (
        <div className="order-sector">
          <Typography className="section-title">{utils.getI18NMessage('ORDER_BILLING_TITLE')}</Typography>
          <OrderBilling activeStep={activeStep} stepsLength={steps.length} back={back} next={next} />
        </div>
      )}

      {activeStep === 3 && (
        <div className="order-sector">
          <Typography className="section-title">{utils.getI18NMessage('ORDER_ITEMS_TITLE')}</Typography>
          <OrderItems activeStep={activeStep} stepsLength={steps.length} back={back} next={next} />
        </div>
      )}

      {activeStep === 4 && (
        <div className="order-sector">
          <OrderDiscountsFee activeStep={activeStep} stepsLength={steps.length} back={back} next={next} />
        </div>
      )}

      {activeStep === 5 && (
        <>
          <div className="order-sector">
            <Typography className="section-title">{utils.getI18NMessage('ORDER_PRODUCT_TITLE')}</Typography>
            <Select value={order.product} onChange={handleChangeProduct}>
              <MenuItem value={E_SCALAPAY_PRODUCT.PAY_IN_3}>{E_SCALAPAY_PRODUCT.PAY_IN_3}</MenuItem>
              <MenuItem value={E_SCALAPAY_PRODUCT.PAY_IN_4}>{E_SCALAPAY_PRODUCT.PAY_IN_4}</MenuItem>
              <MenuItem value={E_SCALAPAY_PRODUCT.PAY_LATER}>{E_SCALAPAY_PRODUCT.PAY_LATER}</MenuItem>
            </Select>
          </div>

          <Divider />

          <div className="order-sector">
            <Typography className="section-title">{utils.getI18NMessage('ORDER_FREQUENCY_TITLE')}</Typography>
            <TextField
              type="text"
              label={utils.getI18NMessage('ORDER_FREQUENCY_NUMBER')}
              fullWidth
              margin="normal"
              value={1}
              error={false}
              helperText={MUI_EMPTY_INPUT_HELPER_TEXT}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              type="text"
              label={utils.getI18NMessage('ORDER_FREQUENCY_TYPE')}
              fullWidth
              margin="normal"
              value={E_SCALAPAY_FREQUENCY_TYPE.MONTHLY}
              error={false}
              helperText={MUI_EMPTY_INPUT_HELPER_TEXT}
              InputProps={{
                readOnly: true,
              }}
            />

            <Divider />

            <OrderStepperOper
              activeStep={activeStep}
              stepsLength={steps.length}
              handleBack={back}
              handleNext={handleSubmit}
            />
          </div>
        </>
      )}
    </div>
  );
}
