import React from 'react';

import { TextField } from '@mui/material';

import * as utils from '../../common/utils';

import { UseInputProps } from '../../hooks';

interface IConsumerInfoProps {
  phoneNumberInputProps: Pick<UseInputProps, Exclude<keyof UseInputProps, 'tools'>>;
  givenNamesInputProps: Pick<UseInputProps, Exclude<keyof UseInputProps, 'tools'>>;
  surnameInputProps: Pick<UseInputProps, Exclude<keyof UseInputProps, 'tools'>>;
  emailInputProps: Pick<UseInputProps, Exclude<keyof UseInputProps, 'tools'>>;
}

type ConsumerInfoProps = IConsumerInfoProps;

export default function ConsumerInfo(props: ConsumerInfoProps) {
  return (
    <div className="comp-info">
      <TextField
        type="text"
        label={utils.getI18NMessage('CONSUMER_PHONE_NUMBER_LABEL')}
        fullWidth
        margin="normal"
        {...props.phoneNumberInputProps}
      />

      <TextField
        type="text"
        label={utils.getI18NMessage('CONSUMER_GIVEN_NAMES_LABEL')}
        fullWidth
        margin="normal"
        {...props.givenNamesInputProps}
      />

      <TextField
        type="text"
        label={utils.getI18NMessage('CONSUMER_SURNAME_LABEL')}
        fullWidth
        margin="normal"
        {...props.surnameInputProps}
      />

      <TextField
        type="text"
        label={utils.getI18NMessage('CONSUMER_EMAIL_LABEL')}
        fullWidth
        margin="normal"
        {...props.emailInputProps}
      />
    </div>
  );
}
