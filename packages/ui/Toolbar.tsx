import React from 'react';
import { Box, BoxProps, ThemingProps, useStyleConfig } from '@chakra-ui/react';

export interface ToolbarProps extends BoxProps, ThemingProps {}

export const Toolbar = (props: ToolbarProps) => {
  const styles = useStyleConfig('Toolbar', props);

  return <Box __css={styles} {...props} />;
};
