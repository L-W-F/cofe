import React, { useEffect, useState } from 'react';
import { Flex, FlexProps, Progress, useToast } from '@chakra-ui/react';
import { subscribe } from '@cofe/io';

export interface RootProps extends FlexProps {
  loading?: boolean;
}

export const Root = ({
  children,
  direction = 'column',
  minH = '100vh',
  ...props
}: FlexProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast({
    status: 'error',
    isClosable: true,
    position: 'bottom-left',
  });

  useEffect(() => {
    let count = 0;

    return subscribe((type, url, init, payload) => {
      if (type === 'start') {
        setIsLoading(++count > 0);
      } else {
        setIsLoading(--count > 0);

        if (payload instanceof Error) {
          toast({
            title: payload.message,
          });
        }
      }
    });
  }, [toast]);

  return (
    <Flex direction={direction} minH={minH} {...props}>
      <Progress
        pos="fixed"
        zIndex={isLoading ? 10000 : -1}
        top={0}
        left={0}
        right={0}
        size="xs"
        isIndeterminate
      />
      {children}
    </Flex>
  );
};
