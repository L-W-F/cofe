import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { themeBase } from './themeBase';

export const Theme: typeof ChakraProvider = ({
  theme = themeBase,
  ...props
}) => <ChakraProvider resetCSS theme={theme} {...props} />;
