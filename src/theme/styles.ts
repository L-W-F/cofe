import { mode, Styles } from '@chakra-ui/theme-tools';

export const styles: Styles = {
  global: (props) => ({
    body: {
      fontFamily: 'body',
      color: mode('gray.700', 'gray.200')(props),
      bg: mode('gray.200', 'gray.700')(props),
      transitionProperty: 'color, background-color',
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
};
