import React from 'react';
import { Flex, FlexProps, Progress, useToast } from '@chakra-ui/react';
import { useIsomorphicLayoutEffect } from '@cofe/hooks';
import { subscribe } from '@cofe/io';
import { useDispatch, useStore } from '@cofe/store';
import { MiscState } from '@/store/misc';

export interface RootProps extends FlexProps {
  loading?: boolean;
}

export const Root = ({
  children,
  direction = 'column',
  minH = '100vh',
  ...props
}: FlexProps) => {
  const is_loading = useStore<MiscState['is_loading']>('misc.is_loading');
  const dispatch = useDispatch();
  const toast = useToast({
    status: 'error',
    isClosable: true,
    position: 'bottom-left',
  });

  useIsomorphicLayoutEffect(() => {
    let count = 0;

    return subscribe((type, url, init, payload) => {
      if (type === 'start') {
        dispatch('SET_IS_LOADING')(++count > 0);
      } else {
        dispatch('SET_IS_LOADING')(--count > 0);

        if (payload instanceof Error) {
          toast({
            title: payload.message,
          });
        }
      }
    });
  }, [dispatch, toast]);

  return (
    <Flex direction={direction} minH={minH} {...props}>
      {children}
      <Progress
        pos="fixed"
        zIndex={10000}
        top={0}
        left={0}
        right={0}
        size="xs"
        opacity={is_loading ? 1 : 0}
        animation="opacity 1s"
        isIndeterminate
      />
    </Flex>
  );
};
