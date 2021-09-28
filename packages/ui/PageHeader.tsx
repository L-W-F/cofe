import React, { ReactNode } from 'react';
import { Flex, Heading } from '@chakra-ui/react';

interface PageHeaderProps {
  title: ReactNode;
  description?: ReactNode;
}

export const PageHeader = ({ title, description }: PageHeaderProps) => {
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
      {description}
    </Flex>
  );
};
