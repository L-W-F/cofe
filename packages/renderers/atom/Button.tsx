import React from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';
import { CofeRendererProps } from '@cofe/types';

interface ButtonRendererProps extends CofeRendererProps, ButtonProps {
  disabled?: boolean;
}

export const ButtonRenderer = ({
  isDesign,
  autoFocus = false,
  disabled: isDisabled,
  ...props
}: ButtonRendererProps) => {
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
