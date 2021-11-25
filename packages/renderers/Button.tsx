import React from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';
import { Renderer } from '@cofe/core';
import { CofeRendererProps, CofeTreeActions } from '@cofe/types';
import { useActions } from './hooks/useActions';

interface ButtonRendererProps extends CofeRendererProps, ButtonProps {
  disabled?: boolean;
  actions?: CofeTreeActions;
}

const ButtonRenderer = ({
  isDesign,
  autoFocus = false,
  disabled: isDisabled,
  actions,
  ...props
}: ButtonRendererProps) => {
  const actionsProps = useActions(
    isDesign || !actions?.length ? null : actions,
  );

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
      {...actionsProps}
      {...props}
    />
  );
};

Renderer.add({
  type: 'button',
  renderer: ButtonRenderer,
});
