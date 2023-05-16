import { createTheme, ThemeOptions, responsiveFontSizes } from '@mui/material/styles';
import { ResponsiveFontSizesOptions } from '@mui/material/styles/responsiveFontSizes'; // TODO

const FONT_FAMILY = ['Roboto-Light', 'Helvetica', 'Arial', 'sans-serif'].join(',');

const baseThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: FONT_FAMILY,
    button: {
      textTransform: 'initial',
    },
  },
};

const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
  },
};

const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
  },
};

const respFontOptions: ResponsiveFontSizesOptions = {
  breakpoints: ['sm', 'md', 'lg'],
  factor: 2,
};

const darkTheme = responsiveFontSizes(createTheme(Object.assign(baseThemeOptions, darkThemeOptions)), respFontOptions);

const lightTheme = responsiveFontSizes(
  createTheme(Object.assign(baseThemeOptions, lightThemeOptions)),
  respFontOptions
);

export { darkTheme, lightTheme };
