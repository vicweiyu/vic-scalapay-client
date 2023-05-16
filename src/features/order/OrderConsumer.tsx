import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { Divider } from '@mui/material';

import { MUI_EMPTY_INPUT_HELPER_TEXT } from '../../common/constants';
import * as utils from '../../common/utils';

import { ConsumerInfo } from '../../components';
import { useInput } from '../../hooks';

import { RootState } from '../../redux/storeConfig';
import { saveConsumer } from '../../redux/orderSlice';

import OrderStepperOper from './OrderStepperOper';

interface IOrderConsumerProps {
  activeStep: number;
  stepsLength: number;
  back: () => void;
  next: () => void;
}

type OrderConsumerProps = IOrderConsumerProps;

export default function OrderConsumer(props: OrderConsumerProps) {
  const dispatch = useDispatch();
  const { consumer } = useSelector((state: RootState) => state.order, shallowEqual);

  const { activeStep, stepsLength, back, next } = props;

  const { tools: phoneNumberTools, ...phoneNumberInputProps } = useInput(
    consumer.phoneNumber,
    MUI_EMPTY_INPUT_HELPER_TEXT
  );
  const { tools: givenNamesTools, ...givenNamesInputProps } = useInput(
    consumer.givenNames,
    MUI_EMPTY_INPUT_HELPER_TEXT
  );
  const { tools: surnameTools, ...surnameInputProps } = useInput(consumer.surname, MUI_EMPTY_INPUT_HELPER_TEXT);
  const { tools: emailTools, ...emailInputProps } = useInput(consumer.email, MUI_EMPTY_INPUT_HELPER_TEXT);

  const consumerInfoProps = { phoneNumberInputProps, givenNamesInputProps, surnameInputProps, emailInputProps };

  const handleBack = () => {
    back();
  };

  const handleNext = () => {
    let isInputErr = false;

    if (utils.isEmptyString(givenNamesInputProps.value)) {
      givenNamesTools.setError(true);
      givenNamesTools.setHelperText(utils.getI18NError('F2101'));
      isInputErr = true;
    }

    if (utils.isEmptyString(surnameInputProps.value)) {
      surnameTools.setError(true);
      surnameTools.setHelperText(utils.getI18NError('F2102'));
      isInputErr = true;
    }

    if (!utils.isEmptyString(emailInputProps.value) && !utils.isValidatedEmail(emailInputProps.value)) {
      emailTools.setError(true);
      emailTools.setHelperText(utils.getI18NError('F2103'));
      isInputErr = true;
    }

    if (isInputErr) {
      return;
    }

    dispatch(
      saveConsumer({
        phoneNumber: phoneNumberInputProps.value,
        givenNames: givenNamesInputProps.value,
        surname: surnameInputProps.value,
        email: emailInputProps.value,
      })
    );

    next();
  };

  return (
    <div className="order-consumer-page">
      <ConsumerInfo {...consumerInfoProps} />

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
