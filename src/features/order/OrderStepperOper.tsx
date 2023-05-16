import React from 'react';

import { Typography, Button } from '@mui/material';

import * as utils from '../../common/utils';

interface IOrderStepperOper {
  activeStep: number;
  stepsLength: number;
  handleBack: () => void;
  handleNext: () => void;
}

type OrderStepperOper = IOrderStepperOper;

export default function OrderStepperOper(props: OrderStepperOper) {
  const { activeStep, stepsLength, handleBack, handleNext } = props;

  return activeStep === stepsLength ? (
    <Typography className="order-success-content">{utils.getI18NMessage('ORDER_SUCCESS')}</Typography>
  ) : (
    <div className="order-stepper-oper">
      <Button variant="contained" disabled={activeStep === 0} onClick={handleBack}>
        {utils.getI18NMessage('BUTTON_BACK')}
      </Button>

      <Button variant="contained" onClick={handleNext}>
        {utils.getI18NMessage(activeStep === stepsLength - 1 ? 'BUTTON_SUBMIT' : 'BUTTON_NEXT')}
      </Button>
    </div>
  );
}
