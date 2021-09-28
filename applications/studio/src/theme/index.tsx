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
    // black: '#16161D',
  },
  fonts,
  breakpoints,
  components: {
    // Link: {
    //   baseStyle: {
    //     color: 'red.500',
    //     _hover: {
    //       color: 'teal.500',
    //     },
    //   },
    // },
    Paper: {
      baseStyle: (props) => ({
        bg: mode('gray.50', 'gray.900')(props),
      }),
    },
    Toolbar: {
      baseStyle: (props) => ({
        minH: 16,
        px: 4,
        alignItems: 'center',
      }),
    },
  },
  styles: {
    global: (props) => ({
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
