import React from 'react';
import { Center, CenterProps } from '@chakra-ui/react';
import { QuestionIcon } from '@cofe/icons';

export const Empty = (props: CenterProps) => (
  <Center p={4} {...props}>
    <QuestionIcon opacity={0.2} boxSize={10} />
  </Center>
);
