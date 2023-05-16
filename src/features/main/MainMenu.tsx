import React from 'react';

import { Toolbar, Divider, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';

import { ROUTE_HOME, ROUTE_ORDER } from '../../common/constants';
import * as utils from '../../common/utils';

interface IMainMenuProps {
  currentMenu: string;
  onClickMenuItem: (menu: string) => void;
  onClickLogout: () => void;
}

export default function MainMenu(props: IMainMenuProps) {
  const { currentMenu, onClickMenuItem, onClickLogout } = props;

  return (
    <div>
      <Toolbar />

      <Divider />

      <List>
        <ListItemButton
          autoFocus
          selected={currentMenu === ROUTE_HOME}
          onClick={() => {
            onClickMenuItem(ROUTE_HOME);
          }}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={utils.getI18NMessage('MENU_HOME')} />
        </ListItemButton>
      </List>

      <Divider />

      <List>
        <ListItemButton
          autoFocus
          selected={currentMenu === ROUTE_ORDER}
          onClick={() => {
            onClickMenuItem(ROUTE_ORDER);
          }}
        >
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary={utils.getI18NMessage('MENU_ORDER')} />
        </ListItemButton>
      </List>

      <Divider />

      <List>
        <ListItemButton onClick={onClickLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary={utils.getI18NMessage('MENU_LOGOUT')} />
        </ListItemButton>
      </List>
    </div>
  );
}
