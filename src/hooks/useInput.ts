import React, { useState } from 'react';

import { MUI_EMPTY_INPUT_HELPER_TEXT } from '../common/constants';

interface IUseInputProps {
  value: string;
  error: boolean;
  helperText: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

  tools: {
    setError: (error: boolean) => void;
    setHelperText: (helperText: string) => void;
  };
}

export type UseInputProps = IUseInputProps;

export default function useInput(defaultValue = '', defaultHelperText = MUI_EMPTY_INPUT_HELPER_TEXT): UseInputProps {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState(defaultHelperText);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setError(false);
    setHelperText(defaultHelperText);
  };

  return {
    value,
    error,
    helperText,
    onChange,

    tools: {
      setError,
      setHelperText,
    },
  };
}
