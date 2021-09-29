import React from 'react';
import { Text, TextProps } from '@chakra-ui/react';
import { AtomProps } from './types';

interface TextAtomProps extends AtomProps, TextProps {
  content?: string;
}

export const TextAtom = ({
  isDesign,
  content,
  children = content,
  ...props
}: TextAtomProps) => {
  return (
    <Text
      _empty={
        isDesign
          ? {
              '&:before': {
                content: '"Text"',
                color: 'gray.400',
                height: '1rem',
              },
            }
          : null
      }
      {...props}
    >
      {children}
    </Text>
  );
};
