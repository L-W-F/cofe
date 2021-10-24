import { useStore } from '@cofe/store';
import { MiscState } from '@/store/misc';

export const useIsLoading = () =>
  useStore<MiscState['is_loading']>('misc.is_loading');
