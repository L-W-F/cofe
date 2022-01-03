import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import { colors } from './colors';
import { components } from './components';
import { styles } from './styles';

const config: ThemeConfig = {
  // useSystemColorMode: true,
};

const fonts = {
  // mono: 'Menlo, monospace'
};

const breakpoints = createBreakpoints({
  sm: '20em',
  md: '40em',
  lg: '60em',
  xl: '80em',
  '2xl': '96em',
});

export const theme = extendTheme({
  config,
  colors,
  fonts,
  breakpoints,
  components,
  styles,
});
