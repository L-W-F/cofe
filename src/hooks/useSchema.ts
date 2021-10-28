import { useStore } from '@cofe/store';
import { merge } from 'lodash';
import { SchemaState } from '@/store/schema';

export const useSchema = (type: string) => {
  return useStore<SchemaState[string]>(
    (state) => {
      const schema = state.schema[type];

      const mixins = schema?.extends?.map((t) => state.schema[t]) ?? [];

      return schema ? merge(schema, ...mixins, { type }) : schema;
    },
    [type],
  );
};
