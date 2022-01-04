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
  as = 'span',
  ...props
}: TextRendererProps) => {
  return (
    <Text as={as} {...props}>
      {content}
    </Text>
  );
};
