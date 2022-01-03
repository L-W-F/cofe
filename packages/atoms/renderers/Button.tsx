import React from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';
import { CofeRendererProps } from '@cofe/types';

interface ButtonRendererProps extends CofeRendererProps, ButtonProps {
  disabled?: boolean;
}

export const ButtonRenderer = ({
  autoFocus = false,
  disabled: isDisabled,
  ...props
}: ButtonRendererProps) => {
  return <Button autoFocus={autoFocus} isDisabled={isDisabled} {...props} />;
};
