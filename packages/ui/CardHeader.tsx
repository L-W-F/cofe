import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';

interface Props {
  title: string;
  action?: React.ReactNode;
}

export const CardHeader = (props: Props) => {
  const { title, action } = props;

  return (
    <Flex
      align="center"
      justify="space-between"
      px="6"
      py="4"
      borderBottomWidth="1px"
    >
      <Heading as="h2" fontSize="lg">
        {title}
      </Heading>
      {action}
    </Flex>
  );
};
