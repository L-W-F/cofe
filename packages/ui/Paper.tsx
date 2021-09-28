import React from 'react';
import { Box, BoxProps, useStyleConfig } from '@chakra-ui/react';

export interface PaperProps extends BoxProps {}

export const Paper = ({
  rounded = 'md',
  shadow = 'xs',
  overflow = 'hidden',
  ...props
}: PaperProps) => {
  const styles = useStyleConfig('Paper', props);

  return (
    <Box
      rounded={rounded}
      shadow={shadow}
      overflow={overflow}
      sx={styles}
      {...props}
    />
  );
};
