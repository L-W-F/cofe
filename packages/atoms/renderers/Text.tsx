import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import { CofeRendererProps } from '@cofe/types';

interface TextRendererProps extends CofeRendererProps, BoxProps {
  content?: string;
  colorScheme?: string;
}

export const TextRenderer = ({
  // dropping children
  children,
  content,
  as = "span",
  ...props
}: TextRendererProps) => {
  return <Box as={as} {...props}>{content}</Box>;
};
