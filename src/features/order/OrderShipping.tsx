import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { Divider } from '@mui/material';

import { MUI_EMPTY_INPUT_HELPER_TEXT } from '../../common/constants';
import * as utils from '../../common/utils';

import { ContactInfo } from '../../components';
import { useInput } from '../../hooks';

import { RootState } from '../../redux/storeConfig';
import { saveShipping } from '../../redux/orderSlice';

import OrderStepperOper from './OrderStepperOper';

interface IOrderShippingProps {
  activeStep: number;
  stepsLength: number;
  back: () => void;
  next: () => void;
}

type OrderShippingProps = IOrderShippingProps;

export default function OrderShipping(props: OrderShippingProps) {
  const dispatch = useDispatch();
  const { shipping } = useSelector((state: RootState) => state.order, shallowEqual);

  const { activeStep, stepsLength, back, next } = props;

  const { tools: phoneNumberTools, ...phoneNumberInputProps } = useInput(
    shipping.phoneNumber,
    MUI_EMPTY_INPUT_HELPER_TEXT
  );
  const { tools: countryCodeTools, ...countryCodeInputProps } = useInput(
    shipping.countryCode,
    MUI_EMPTY_INPUT_HELPER_TEXT
  );
  const { tools: nameTools, ...nameInputProps } = useInput(shipping.name, MUI_EMPTY_INPUT_HELPER_TEXT);
  const { tools: postcodeTools, ...postcodeInputProps } = useInput(shipping.postcode, MUI_EMPTY_INPUT_HELPER_TEXT);
  const { tools: suburbTools, ...suburbInputProps } = useInput(shipping.suburb, MUI_EMPTY_INPUT_HELPER_TEXT);
  const { tools: line1Tools, ...line1InputProps } = useInput(shipping.line1, MUI_EMPTY_INPUT_HELPER_TEXT);

  const contactInfoProps = {
    phoneNumberInputProps,
    countryCodeInputProps,
    nameInputProps,
    postcodeInputProps,
    suburbInputProps,
    line1InputProps,
  };

  const handleBack = () => {
    back();
  };

  const handleNext = () => {
    let isInputErr = false;

    if (utils.isEmptyString(countryCodeInputProps.value)) {
      countryCodeTools.setError(true);
      countryCodeTools.setHelperText(utils.getI18NError('F2104'));
      isInputErr = true;
    }

    if (utils.isEmptyString(nameInputProps.value)) {
      nameTools.setError(true);
      nameTools.setHelperText(utils.getI18NError('F2105'));
      isInputErr = true;
    }

    if (utils.isEmptyString(postcodeInputProps.value)) {
      postcodeTools.setError(true);
      postcodeTools.setHelperText(utils.getI18NError('F2106'));
      isInputErr = true;
    }

    if (utils.isEmptyString(line1InputProps.value)) {
      line1Tools.setError(true);
      line1Tools.setHelperText(utils.getI18NError('F2107'));
      isInputErr = true;
    }

    if (isInputErr) {
      return;
    }

    dispatch(
      saveShipping({
        phoneNumber: phoneNumberInputProps.value,
        countryCode: countryCodeInputProps.value,
        name: nameInputProps.value,
        postcode: postcodeInputProps.value,
        suburb: suburbInputProps.value,
        line1: line1InputProps.value,
      })
    );

    next();
  };

  return (
    <div className="order-shipping-page">
      <ContactInfo {...contactInfoProps} />

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
