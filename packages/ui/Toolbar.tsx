import { Box, BoxProps } from '@chakra-ui/react';
import { withSx } from './withSx';

export interface ToolbarProps extends BoxProps {}

export const Toolbar = withSx<ToolbarProps>('Toolbar')(Box);
