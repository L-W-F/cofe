import React from 'react';
import { Text, TextProps } from '@chakra-ui/react';
import { CofeRendererProps } from '@cofe/types';

interface TextRendererProps extends CofeRendererProps, TextProps {
  content?: string;
  colorScheme?: string;
}

export const TextRenderer = ({
  // dropping children
  children,
  content,
  ...props
}: TextRendererProps) => {
  return <Text {...props}>{content}</Text>;
};
