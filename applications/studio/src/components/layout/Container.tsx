import React, { useEffect, useState } from 'react';
import {
  Flex,
  FlexProps,
  Progress,
  useColorMode,
  useToast,
} from '@chakra-ui/react';
import { Listener, subscribe } from '@cofe/io';

const bgColor = { light: 'gray.50', dark: 'gray.900' };
const color = { light: 'black', dark: 'white' };

export const Container = ({ children, ...props }: FlexProps) => {
  const { colorMode } = useColorMode();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    let count = 0;
    let mounted = true;

    const listener: Listener = (type, url, init, payload) => {
      if (type === 'start') {
        setTimeout(() => {
          if (mounted) {
            setLoading(++count > 0);
          }
        }, 500);
      } else {
        if (mounted) {
          setLoading(--count > 0);

          if (payload instanceof Error) {
            toast({
              title: payload.message,
              status: 'error',
              isClosable: true,
            });
          }
        }
      }
    };

    const unsubscribe = subscribe(listener);

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [toast]);

  return (
    <Flex
      minWidth="100vw"
      minHeight="100vh"
      direction="column"
      p={2}
      gridGap={2}
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      {...props}
    >
      {loading ? (
        <Progress
          pos="fixed"
          top={2}
          left={2}
          right={2}
          size="xs"
          isIndeterminate
        />
      ) : null}
      {children}
    </Flex>
  );
};
