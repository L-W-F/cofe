import { useMemo } from 'react';
import { useToast } from '@chakra-ui/react';

export const useActions = (actions) => {
  const toast = useToast({
    status: 'info',
    position: 'top',
  });

  return useMemo(
    () =>
      actions?.reduce(
        (o, { type, payload: { action, params } }) => ({
          ...o,
          [type]: () => {
            toast({
              title: action,
              description: params,
            });
          },
        }),
        {},
      ) ?? null,
    [actions, toast],
  );
};
