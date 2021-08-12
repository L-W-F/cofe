import React from 'react';
import { Box, useTheme } from '@chakra-ui/react';

export const Logo = () => {
  const theme = useTheme();

  return (
    <Box
      fontSize={24}
      fontWeight={600}
      transform="auto"
      scaleX={1.2}
      scaleY={1.2}
      textShadow={`
      1px 0px 0px ${theme.colors.teal[300]},
      0px 1px 0px ${theme.colors.purple[300]},
      2px 1px 0px ${theme.colors.teal[300]},
      1px 2px 0px ${theme.colors.purple[300]};
      `}
    >
      COFE
    </Box>
  );
};
