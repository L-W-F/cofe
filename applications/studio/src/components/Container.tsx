import React, { useEffect, useState } from 'react';
import { FlexProps, useToast } from '@chakra-ui/react';
import { Listener, subscribe } from '@cofe/io';
import { Container as C } from '@cofe/ui';

export interface ContainerProps extends FlexProps {
  loading?: boolean;
}

export const Container = (props: FlexProps) => {
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

  return <C loading={loading} {...props} />;
};
