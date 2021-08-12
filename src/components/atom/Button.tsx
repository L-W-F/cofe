import React from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';
import { useStore } from '../../store';

interface ButtonAtomProps extends ButtonProps {
  disabled?: boolean;
}

export const ButtonAtom = ({
  autoFocus = false,
  disabled: isDisabled,
  ...props
}: ButtonAtomProps) => {
  const isEditorMode = useStore<boolean>('config.editMode');

  return (
    <Button
      autoFocus={autoFocus}
      _empty={
        isEditorMode
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
