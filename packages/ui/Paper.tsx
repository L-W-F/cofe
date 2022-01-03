import { Box, BoxProps } from '@chakra-ui/react';
import { withSx } from './withSx';

export interface PaperProps extends BoxProps {}

export const Paper = withSx<PaperProps>('Paper', {
  rounded: 'md',
  shadow: 'xs',
  overflow: 'hidden',
})(Box);
