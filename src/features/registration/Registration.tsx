import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { Typography, TextField, InputAdornment, IconButton, Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { MUI_EMPTY_INPUT_HELPER_TEXT, ROUTE_LOGIN, ROUTE_REGISTRATION_SUCC } from '../../common/constants';
import * as utils from '../../common/utils';

import { PageTools } from '../../components';
import { useInput } from '../../hooks';

import { register } from '../../api';

export default function Registration() {
  const navigate = useNavigate();

  const { tools: usernameTools, ...usernameInputProps } = useInput('', MUI_EMPTY_INPUT_HELPER_TEXT);
  const { tools: passwordTools, ...passwordInputProps } = useInput('', MUI_EMPTY_INPUT_HELPER_TEXT);

  const [isShowPwd, setShowPwd] = useState(false);

  const onClickReg = async () => {
    let isInputErr = false;

    if (!utils.isValidatedEmail(usernameInputProps.value)) {
      isInputErr = true;
      usernameTools.setError(true);
      usernameTools.setHelperText(utils.getI18NError('F2001'));
    }

    if (!utils.isValidatedPassword(passwordInputProps.value)) {
      isInputErr = true;
      passwordTools.setError(true);
      passwordTools.setHelperText(utils.getI18NError('F2002'));
    }

    if (isInputErr) {
      return;
    }

    try {
      utils.showLoading();
      await register(usernameInputProps.value, passwordInputProps.value);
      utils.hideLoading();

      navigate(ROUTE_REGISTRATION_SUCC);
    } catch (e) {
      utils.hideLoading();

      utils.showToast((e as Error).message, 'error');
    }
  };

  return (
    <div className="reg-page">
      <div className="reg-title">
        <Typography>{utils.getI18NMessage('REG_TITLE')}</Typography>
      </div>

      <div className="reg-input">
        <TextField
          type="text"
          label={utils.getI18NMessage('REG_EMAIL_LABEL')}
          fullWidth
          margin="normal"
          {...usernameInputProps}
        />

        <TextField
          type={isShowPwd ? 'text' : 'password'}
          label={utils.getI18NMessage('REG_PASSWORD_LABEL')}
          fullWidth
          margin="normal"
          {...passwordInputProps}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onMouseDown={(event: React.MouseEvent) => {
                    event.preventDefault();
                  }}
                  onClick={() => {
                    setShowPwd(!isShowPwd);
                  }}
                >
                  {isShowPwd ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>

      <div className="reg-oper">
        <div className="oper-btn">
          <Button variant="contained" fullWidth onClick={onClickReg}>
            {utils.getI18NMessage('REG_BTN_REGISTER')}
          </Button>
        </div>

        <div className="oper-link">
          <Link to={ROUTE_LOGIN} className="link-item">
            <Typography className="xsmall-font" sx={{ color: 'primary.main' }}>
              {utils.getI18NMessage('REG_LOGIN_TEXT')}
            </Typography>
          </Link>
        </div>
      </div>

      <PageTools />
    </div>
  );
}
