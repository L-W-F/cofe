import React, { useEffect } from 'react';
import { Flex, FlexProps, Progress, useToast } from '@chakra-ui/react';
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

  useEffect(() => {
    let count = 0;

    return subscribe((type, url, init, payload) => {
      if (type === 'start') {
        dispatch('IS_LOADING')(++count > 0);
      } else {
        dispatch('IS_LOADING')(--count > 0);

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
      <Progress
        pos="fixed"
        zIndex={is_loading ? 10000 : -1}
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
