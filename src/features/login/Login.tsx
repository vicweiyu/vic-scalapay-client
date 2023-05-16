import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import { TextField, InputAdornment, IconButton, Button, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { MUI_EMPTY_INPUT_HELPER_TEXT, ROUTE_REGISTRATION, ROUTE_HOME } from '../../common/constants';
import * as utils from '../../common/utils';

import { PageTools } from '../../components';
import { useInput } from '../../hooks';

import { saveCredential } from '../../redux/appSlice';

import { login } from '../../api';

import logo from '../../images/common/logo.png';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tools: usernameTools, ...usernameInputProps } = useInput('vic.weiyu@gmail.com', MUI_EMPTY_INPUT_HELPER_TEXT);
  const { tools: passwordTools, ...passwordInputProps } = useInput('Abc@1234', MUI_EMPTY_INPUT_HELPER_TEXT);

  const [isShowPwd, setShowPwd] = useState(false);

  const onClickLogin = async () => {
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
      const { jwt } = await login(usernameInputProps.value, passwordInputProps.value);
      await dispatch(saveCredential({ jwt }));
      utils.hideLoading();

      navigate(ROUTE_HOME);
    } catch (e) {
      utils.hideLoading();

      utils.showToast((e as Error).message, 'error');
    }
  };

  return (
    <div className="login-page">
      <div className="login-logo">
        <img src={logo} />
      </div>

      <div className="login-input">
        <TextField
          type="text"
          label={utils.getI18NMessage('LOGIN_EMAIL_LABEL')}
          fullWidth
          margin="normal"
          {...usernameInputProps}
        />

        <TextField
          type={isShowPwd ? 'text' : 'password'}
          label={utils.getI18NMessage('LOGIN_PASSWORD_LABEL')}
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

      <div className="login-oper">
        <div className="oper-btn">
          <Button variant="contained" fullWidth onClick={onClickLogin}>
            {utils.getI18NMessage('LOGIN_BTN_LOGIN')}
          </Button>
        </div>
        <div className="oper-links">
          <Link to={ROUTE_REGISTRATION} className="link-item">
            <Typography className="xsmall-font" sx={{ color: 'primary.main' }}>
              {utils.getI18NMessage('LOGIN_SIGNUP_TEXT')}
            </Typography>
          </Link>
        </div>
      </div>

      <PageTools />
    </div>
  );
}
