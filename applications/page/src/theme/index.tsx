import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const fonts = { mono: 'Menlo, monospace' };

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
});

export const theme = extendTheme({
  colors: {
    black: '#16161D',
  },
  fonts,
  breakpoints,
  components: {
    Toast: {
      defaultProps: {
        variant: 'solid',
        duration: 3000,
      },
    },
    Link: {
      baseStyle: {
        color: 'red.500',
        _hover: {
          color: 'teal.500',
        },
      },
    },
  },
});
