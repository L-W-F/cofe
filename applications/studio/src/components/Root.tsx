import React, { useEffect, useState } from 'react';
import { Box, BoxProps, Progress, useToast } from '@chakra-ui/react';
import { Listener, subscribe } from '@cofe/io';

export interface RootProps extends BoxProps {
  loading?: boolean;
}

export const Root = ({ children, ...props }: BoxProps) => {
  const [loading, setLoading] = useState(false);
  const toast = useToast({
    status: 'error',
    isClosable: true,
    position: 'bottom-left',
  });

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
    <Box {...props}>
      {loading ? (
        <Progress
          pos="fixed"
          top={0}
          left={0}
          right={0}
          size="xs"
          isIndeterminate
        />
      ) : null}
      {children}
    </Box>
  );
};
