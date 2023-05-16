import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Typography, Button } from '@mui/material';

import { ROUTE_LOGIN } from '../../common/constants';
import * as utils from '../../common/utils';

import logo from '../../images/common/logo.png';

export default function RegistrationSucc() {
  const navigate = useNavigate();

  return (
    <div className="reg-succ-page">
      <div className="succ-pic">
        <img src={logo} />
      </div>

      <div className="succ-context">
        <Typography>{utils.getI18NMessage('REG_SUCC_CONTEXT')}</Typography>
      </div>

      <div className="succ-oper">
        <Button
          variant="contained"
          fullWidth
          onClick={() => {
            navigate(ROUTE_LOGIN);
          }}
        >
          {utils.getI18NMessage('REG_SUCC_BTN_LOGIN')}
        </Button>
      </div>
    </div>
  );
}
