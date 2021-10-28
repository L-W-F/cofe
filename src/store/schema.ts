import { AnyAction } from '@cofe/store';
import { CofeSchema } from '@cofe/types';
import { omit } from 'lodash';

export type SchemaState = Record<string, CofeSchema>;

export const initialState: SchemaState = {};

export const reducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case 'CREATE_SCHEMA':
    case 'UPDATE_SCHEMA':
      return {
        ...state,
        [payload.type]: payload.schema,
      };

    case 'DELETE_SCHEMA':
      return omit(state, [payload.type]);

    case 'FETCH_SCHEMAS':
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
};
