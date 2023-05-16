import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { Divider } from '@mui/material';

import { MUI_EMPTY_INPUT_HELPER_TEXT } from '../../common/constants';

import { ContactInfo } from '../../components';
import { useInput } from '../../hooks';

import { RootState } from '../../redux/storeConfig';
import { saveBilling } from '../../redux/orderSlice';

import OrderStepperOper from './OrderStepperOper';

interface IOrderBillingProps {
  activeStep: number;
  stepsLength: number;
  back: () => void;
  next: () => void;
}

type OrderBillingProps = IOrderBillingProps;

export default function OrderBilling(props: OrderBillingProps) {
  const dispatch = useDispatch();
  const { billing } = useSelector((state: RootState) => state.order, shallowEqual);

  const { activeStep, stepsLength, back, next } = props;

  const { tools: phoneNumberTools, ...phoneNumberInputProps } = useInput(
    billing.phoneNumber,
    MUI_EMPTY_INPUT_HELPER_TEXT
  );
  const { tools: countryCodeTools, ...countryCodeInputProps } = useInput(
    billing.countryCode,
    MUI_EMPTY_INPUT_HELPER_TEXT
  );
  const { tools: nameTools, ...nameInputProps } = useInput(billing.name, MUI_EMPTY_INPUT_HELPER_TEXT);
  const { tools: postcodeTools, ...postcodeInputProps } = useInput(billing.postcode, MUI_EMPTY_INPUT_HELPER_TEXT);
  const { tools: suburbTools, ...suburbInputProps } = useInput(billing.suburb, MUI_EMPTY_INPUT_HELPER_TEXT);
  const { tools: line1Tools, ...line1InputProps } = useInput(billing.line1, MUI_EMPTY_INPUT_HELPER_TEXT);

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
    dispatch(
      saveBilling({
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
    <div className="order-billing-page">
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
