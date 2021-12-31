import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { createBreakpoints, mode } from '@chakra-ui/theme-tools';

const config: ThemeConfig = {
  // useSystemColorMode: true,
};

const fonts = { mono: 'Menlo, monospace' };

const breakpoints = createBreakpoints({
  sm: '20em',
  md: '40em',
  lg: '60em',
  xl: '80em',
  '2xl': '96em',
});

export const theme = extendTheme({
  config,
  colors: {
    primary: {
      main: 'var(--primary-main)',
      light: 'var(--primary-light)',
      dark: 'var(--primary-dark)',
      contrastText: 'var(--primary-contrastText)',
    },
    secondary: {
      main: 'var(--secondary-main)',
      light: 'var(--secondary-light)',
      dark: 'var(--secondary-dark)',
      contrastText: 'var(--secondary-contrastText)',
    },
    error: {
      main: 'var(--error-main)',
      light: 'var(--error-light)',
      dark: 'var(--error-dark)',
      contrastText: 'var(--error-contrastText)',
    },
    warning: {
      main: 'var(--warning-main)',
      light: 'var(--warning-light)',
      dark: 'var(--warning-dark)',
      contrastText: 'var(--warning-contrastText)',
    },
    info: {
      main: 'var(--info-main)',
      light: 'var(--info-light)',
      dark: 'var(--info-dark)',
      contrastText: 'var(--info-contrastText)',
    },
    success: {
      main: 'var(--success-main)',
      light: 'var(--success-light)',
      dark: 'var(--success-dark)',
      contrastText: 'var(--success-contrastText)',
    },
    text: {
      primary: 'var(--text-primary)',
      secondary: 'var(--text-secondary)',
      disabled: 'var(--text-disabled)',
    },
    background: {
      paper: 'var(--background-paper)',
      default: 'var(--background-default)',
    },
    action: {
      active: 'var(--action-active)',
      hover: 'var(--action-hover)',
      selected: 'var(--action-selected)',
      disabled: 'var(--action-disabled)',
      disabledBackground: 'var(--action-disabledBackground)',
      focus: 'var(--action-focus)',
    },
  },
  fonts,
  breakpoints,
  components: {
    Accordion: {
      baseStyle: {
        container: {
          borderTopWidth: 0,
          _last: {
            borderBottomWidth: 0,
          },
        },
      },
    },
    Link: {
      transition: 'color 0.2s',
      baseStyle: {
        _hover: {
          color: 'secondary.main',
        },
      },
    },
    Paper: {
      baseStyle: (props) => ({
        bg: mode('gray.50', 'gray.900')(props),
      }),
    },
    Card: {
      baseStyle: {
        py: 2,
      },
    },
    Toolbar: {
      baseStyle: {
        display: 'flex',
        zIndex: 2,
        minH: 12,
        px: 4,
        gridGap: 2,
        alignItems: 'center',
      },
      sizes: {
        xs: {
          minH: 4,
          gridGap: 0.5,
        },
        sm: {
          minH: 8,
          gridGap: 1,
        },
      },
    },
  },
  styles: {
    global: (props) => ({
      ':root': {
        '--primary-main': mode('#1976d2', '#90caf9')(props),
        '--primary-light': mode('#42a5f5', '#e3f2fd')(props),
        '--primary-dark': mode('#1565c0', '#42a5f5')(props),
        '--primary-contrastText': mode('#fff', 'rgba(0, 0, 0, 0.87)')(props),
        '--secondary-main': mode('#9c27b0', '#ce93d8')(props),
        '--secondary-light': mode('#ba68c8', '#f3e5f5')(props),
        '--secondary-dark': mode('#7b1fa2', '#ab47bc')(props),
        '--secondary-contrastText': mode('#fff', 'rgba(0, 0, 0, 0.87)')(props),
        '--error-main': mode('#d32f2f', '#f44336')(props),
        '--error-light': mode('#ef5350', '#e57373')(props),
        '--error-dark': mode('#c62828', '#d32f2f')(props),
        '--error-contrastText': mode('#fff', '#fff')(props),
        '--warning-main': mode('#ed6c02', '#ffa726')(props),
        '--warning-light': mode('#ff9800', '#ffb74d')(props),
        '--warning-dark': mode('#e65100', '#f57c00')(props),
        '--warning-contrastText': mode('#fff', 'rgba(0, 0, 0, 0.87)')(props),
        '--info-main': mode('#0288d1', '#29b6f6')(props),
        '--info-light': mode('#03a9f4', '#4fc3f7')(props),
        '--info-dark': mode('#01579b', '#0288d1')(props),
        '--info-contrastText': mode('#fff', 'rgba(0, 0, 0, 0.87)')(props),
        '--success-main': mode('#2e7d32', '#66bb6a')(props),
        '--success-light': mode('#4caf50', '#81c784')(props),
        '--success-dark': mode('#1b5e20', '#388e3c')(props),
        '--success-contrastText': mode('#fff', 'rgba(0, 0, 0, 0.87)')(props),
        '--text-primary': mode('rgba(0, 0, 0, 0.87)', '#fff')(props),
        '--text-secondary': mode('rgba(0, 0, 0, 0.6)', 'rgba(255, 255, 255, 0.7)')(props),
        '--text-disabled': mode('rgba(0, 0, 0, 0.38)', 'rgba(255, 255, 255, 0.5)')(props),
        '--background-paper': mode('#fff', '#121212')(props),
        '--background-default': mode('#fff', '#121212')(props),
        '--action-active': mode('rgba(0, 0, 0, 0.54)', '#fff')(props),
        '--action-hover': mode('rgba(0, 0, 0, 0.04)', 'rgba(255, 255, 255, 0.08)')(props),
        '--action-selected': mode('rgba(0, 0, 0, 0.08)', 'rgba(255, 255, 255, 0.16)')(props),
        '--action-disabled': mode('rgba(0, 0, 0, 0.26)', 'rgba(255, 255, 255, 0.3)')(props),
        '--action-disabledBackground': mode('rgba(0, 0, 0, 0.12)', 'rgba(255, 255, 255, 0.12)')(props),
        '--action-focus': mode('rgba(0, 0, 0, 0.12)', 'rgba(255, 255, 255, 0.12)')(props),
      },
      body: {
        fontFamily: 'body',
        color: mode('gray.800', 'gray.100')(props),
        bg: mode('gray.100', 'gray.800')(props),
        transitionProperty: 'background-color',
        transitionDuration: 'normal',
        lineHeight: 'base',
      },
      '*::placeholder': {
        color: mode('gray.400', 'whiteAlpha.400')(props),
      },
      '*, *::before, &::after': {
        borderColor: mode('gray.200', 'whiteAlpha.300')(props),
        wordWrap: 'break-word',
      },
    }),
  },
});
