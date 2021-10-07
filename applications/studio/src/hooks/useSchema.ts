import { useStore } from '@cofe/store';
import { SchemaState } from '@/store/schema';

export const useSchema = (type: string) => {
  return useStore<SchemaState[string]>(
    (state) => {
      return state.schema[type];
    },
    [type],
  );
};
