import React, { ReactNode } from 'react';
import { Flex, FlexProps, Heading } from '@chakra-ui/react';

export interface PaneProps extends FlexProps {
  heading?: ReactNode;
}

export const Pane = ({
  heading,
  flexDirection = 'column',
  overflow,
  children,
  ...props
}: PaneProps) => (
  <Flex
    flexDirection={flexDirection}
    borderWidth={1}
    borderStyle={'solid'}
    borderColor={'silver'}
    p={4}
    {...props}
  >
    {heading ? (
      <Heading size="sm" mb={2} whiteSpace="nowrap">
        {heading}
      </Heading>
    ) : null}
    <Flex flex={1} flexDirection="column" overflow={overflow}>
      {children}
    </Flex>
  </Flex>
);
