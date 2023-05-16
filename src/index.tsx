import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { CssBaseline } from '@mui/material';
import { Theme, ThemeProvider } from '@mui/material/styles';

import {
  ROUTE_LOGIN,
  ROUTE_LOGOUT,
  ROUTE_REGISTRATION,
  ROUTE_REGISTRATION_SUCC,
  ROUTE_MAIN,
  ROUTE_HOME,
  ROUTE_ORDER,
} from './common/constants';
import { darkTheme, lightTheme } from './common/theme';

import store from './redux/storeConfig';

import { Login } from './features/login';
import { Logout } from './features/logout';
import { Registration, RegistrationSucc } from './features/registration';
import { Main } from './features/main';
import { Home } from './features/home';
import { Order } from './features/order';

import './styles/index.less';

const ThemeContext = React.createContext({ switchTheme: () => {} });

function App() {
  const [theme, setTheme] = React.useState<Theme>(darkTheme);

  const context = React.useMemo(
    () => ({
      switchTheme: () => {
        setTheme((prevTheme) => (prevTheme.palette.mode === 'dark' ? lightTheme : darkTheme));
      },
    }),
    []
  );

  return (
    <ReduxProvider store={store}>
      <ThemeContext.Provider value={context}>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          <BrowserRouter>
            <Routes>
              <Route path={ROUTE_LOGIN} element={<Login />} />
              <Route path={ROUTE_LOGOUT} element={<Logout />} />
              <Route path={ROUTE_REGISTRATION} element={<Registration />} />
              <Route path={ROUTE_REGISTRATION_SUCC} element={<RegistrationSucc />} />
              <Route path={ROUTE_MAIN} element={<Main />}>
                <Route path={ROUTE_HOME} element={<Home />} />
                <Route path={ROUTE_ORDER} element={<Order />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </ThemeContext.Provider>
    </ReduxProvider>
  );
}

const startApp = () => {
  const container = document.getElementById('root');
  const root = createRoot(container!);
  root.render(<App />);
};

startApp();
