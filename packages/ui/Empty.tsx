import React from 'react';
import { QuestionIcon } from '@chakra-ui/icons';
import { Center, CenterProps } from '@chakra-ui/react';

export const Empty = (props: CenterProps) => (
  <Center p={4} {...props}>
    <QuestionIcon opacity={0.2} boxSize={10} />
  </Center>
);
