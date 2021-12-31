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
        '--primary-main': mode('#2e7d32', '#1b5e20')(props),
        '--primary-light': mode('#60ac5d', '#4c8c4a')(props),
        '--primary-dark': mode('#004f04', '#003300')(props),
        '--primary-contrastText': '#ffffff',
        '--secondary-main': mode('#d84315', '#bf360c')(props),
        '--secondary-light': mode('#ff7543', '#f9683a')(props),
        '--secondary-dark': mode('#9f0000', '#870000')(props),
        '--secondary-contrastText': '#ffffff',
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
