import { useCallback } from 'react';
import { AlertStatus, useToast as useToast_ } from '@chakra-ui/react';

export const useToast = (id: string = 'toast') => {
  const toast = useToast_({
    position: 'top',
  });

  return useCallback(
    (title: string, status: AlertStatus = 'info') => {
      if (toast.isActive(id)) {
        toast.update(id, { title, status });
      } else {
        toast({ id, title, status });
      }
    },
    [id, toast],
  );
};
