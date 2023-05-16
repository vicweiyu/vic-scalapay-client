import React from 'react';

import { TextField } from '@mui/material';

import * as utils from '../../common/utils';

import { UseInputProps } from '../../hooks';

interface IContactInfoProps {
  phoneNumberInputProps: Pick<UseInputProps, Exclude<keyof UseInputProps, 'tools'>>;
  countryCodeInputProps: Pick<UseInputProps, Exclude<keyof UseInputProps, 'tools'>>;
  nameInputProps: Pick<UseInputProps, Exclude<keyof UseInputProps, 'tools'>>;
  postcodeInputProps: Pick<UseInputProps, Exclude<keyof UseInputProps, 'tools'>>;
  suburbInputProps: Pick<UseInputProps, Exclude<keyof UseInputProps, 'tools'>>;
  line1InputProps: Pick<UseInputProps, Exclude<keyof UseInputProps, 'tools'>>;
}

type ContactInfoProps = IContactInfoProps;

export default function ContactInfo(props: ContactInfoProps) {
  return (
    <div className="comp-info">
      <TextField
        type="text"
        label={utils.getI18NMessage('CONTACT_PHONENUMBER_LABEL')}
        fullWidth
        margin="normal"
        {...props.phoneNumberInputProps}
      />

      <TextField
        type="text"
        label={utils.getI18NMessage('CONTACT_COUNTRY_CODE_LABEL')}
        fullWidth
        margin="normal"
        {...props.countryCodeInputProps}
      />

      <TextField
        type="text"
        label={utils.getI18NMessage('CONTACT_NAME_LABEL')}
        fullWidth
        margin="normal"
        {...props.nameInputProps}
      />

      <TextField
        type="text"
        label={utils.getI18NMessage('CONTACT_POSTCODE_LABEL')}
        fullWidth
        margin="normal"
        {...props.postcodeInputProps}
      />

      <TextField
        type="text"
        label={utils.getI18NMessage('CONTACT_SUBURB_LABEL')}
        fullWidth
        margin="normal"
        {...props.suburbInputProps}
      />

      <TextField
        type="text"
        label={utils.getI18NMessage('CONTACT_LINE1_LABEL')}
        fullWidth
        margin="normal"
        {...props.line1InputProps}
      />
    </div>
  );
}
