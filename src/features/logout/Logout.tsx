import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Typography, Button } from '@mui/material';

import { ROUTE_LOGIN } from '../../common/constants';
import * as utils from '../../common/utils';

import logo from '../../images/common/logo.png';

export default function Logout() {
  const navigate = useNavigate();

  return (
    <div className="logout-page">
      <div className="logout-logo">
        <img src={logo} />
      </div>

      <div className="logout-context">
        <Typography>{utils.getI18NMessage('LOGOUT_TEXT')}</Typography>
      </div>

      <div className="logout-oper">
        <Button
          variant="contained"
          fullWidth
          onClick={() => {
            navigate(ROUTE_LOGIN);
          }}
        >
          {utils.getI18NMessage('LOGOUT_BTN_RELOGIN')}
        </Button>
      </div>
    </div>
  );
}
