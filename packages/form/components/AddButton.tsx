import React, { FC } from 'react';
import { Button } from '@chakra-ui/react';
import { AddIcon } from '@cofe/icons';
import { AddButtonProps } from '@rjsf/core';

export const AddButton: FC<AddButtonProps> = (props) => (
  <Button {...props} leftIcon={<AddIcon />}>
    添加一项
  </Button>
);
