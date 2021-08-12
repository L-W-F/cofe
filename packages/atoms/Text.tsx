import React from 'react';
import { Text, TextProps } from '@chakra-ui/react';
import { useStore } from '@cofe/store';

interface TextAtomProps extends TextProps {
  content?: string;
}

export const TextAtom = ({
  content,
  children = content,
  ...props
}: TextAtomProps) => {
  const isEditorMode = useStore<boolean>('whoami.config.editMode');

  return (
    <Text
      _empty={
        isEditorMode
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