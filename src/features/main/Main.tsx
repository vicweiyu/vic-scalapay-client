import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';

import { Box, AppBar, Toolbar, IconButton, Typography, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { MUI_DRAWER_WIDTH, ROUTE_LOGOUT, ROUTE_HOME } from '../../common/constants';
import * as utils from '../../common/utils';

import { PageTools } from '../../components';

import { removeCredential } from '../../redux/appSlice';

import MainMenu from './MainMenu';

export default function Main() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentMenu, setCurrentMenu] = React.useState(ROUTE_HOME);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleMenuToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const onClickMenuItem = (menu: string) => {
    setCurrentMenu(menu);
    setMobileOpen(false);
    navigate(menu);
  };

  const onClickLogout = async () => {
    try {
      utils.showLoading();
      await dispatch(removeCredential({}));
      utils.hideLoading();

      navigate(ROUTE_LOGOUT);
    } catch (e) {
      await dispatch(removeCredential({}));
      utils.hideLoading();

      utils.showToast((e as Error).message, 'error'); // TODO
      navigate(ROUTE_LOGOUT);
    }
  };

  return (
    <Box className="main-page" sx={{ display: 'flex' }}>
      <AppBar
        sx={{
          width: { sm: `calc(100% - ${MUI_DRAWER_WIDTH}px)` },
          ml: { sm: `${MUI_DRAWER_WIDTH}px` },
        }}
      >
        <Toolbar>
          <IconButton edge="start" onClick={handleMenuToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography component="div" variant="h6" noWrap>
            {utils.getTitleByMenu(currentMenu)}
          </Typography>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { sm: MUI_DRAWER_WIDTH }, flexShrink: { sm: 0 } }}>
        <Drawer
          open={mobileOpen}
          onClose={handleMenuToggle}
          variant="temporary"
          sx={{
            'display': { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: MUI_DRAWER_WIDTH },
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <MainMenu currentMenu={currentMenu} onClickMenuItem={onClickMenuItem} onClickLogout={onClickLogout} />
        </Drawer>

        <Drawer
          open
          variant="permanent"
          sx={{
            'display': { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: MUI_DRAWER_WIDTH },
          }}
        >
          <MainMenu currentMenu={currentMenu} onClickMenuItem={onClickMenuItem} onClickLogout={onClickLogout} />
        </Drawer>
      </Box>

      <Box component="main" sx={{ width: { sm: `calc(100% - ${MUI_DRAWER_WIDTH}px)` }, flexGrow: 1 }}>
        <Toolbar />
        <Outlet />
      </Box>

      <PageTools />
    </Box>
  );
}
