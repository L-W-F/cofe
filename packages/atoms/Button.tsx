import React from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';
import { AtomProps } from './types';

interface ButtonAtomProps extends AtomProps, ButtonProps {
  disabled?: boolean;
}

export const ButtonAtom = ({
  isDesign,
  autoFocus = false,
  disabled: isDisabled,
  ...props
}: ButtonAtomProps) => {
  return (
    <Button
      autoFocus={autoFocus}
      _empty={
        isDesign
          ? {
              '&:before': {
                content: '"Button"',
                color: 'gray.400',
                height: '1rem',
              },
            }
          : null
      }
      isDisabled={isDisabled}
      {...props}
    />
  );
};
