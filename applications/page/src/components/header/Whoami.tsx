import { useStore } from '@cofe/store';

export const Whoami = () => {
  const whoami = useStore('whoami');

  return whoami?.name ?? 'Guest';
};
