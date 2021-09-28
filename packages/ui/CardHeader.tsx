import React, { ReactNode } from 'react';
import { Box, Flex, FlexProps, Heading, Text } from '@chakra-ui/react';

interface CardHeaderProps extends Partial<Omit<FlexProps, 'title'>> {
  avatar?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}

export const CardHeader = ({
  avatar,
  title,
  description,
  action,
  ...props
}: CardHeaderProps) => {
  return (
    <Flex p={4} gridGap={2} alignItems="center" {...props}>
      {avatar}
      {title ? (
        <Box flex={1}>
          <Heading as="h2" fontSize="lg" lineHeight={1}>
            {title}
          </Heading>
          {description ? (
            <Text mt={1} color="gray.500">
              {description}
            </Text>
          ) : null}
        </Box>
      ) : null}
      {action}
    </Flex>
  );
};
