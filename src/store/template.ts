import { AnyAction } from '@cofe/store';
import { CofeSchema } from '@cofe/types';
import { omit } from 'lodash-es';

export interface TemplateState extends Record<CofeSchema['type'], CofeSchema> {}

export const initialState: TemplateState = {};

export const reducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case 'CREATE_TEMPLATE':
      return {
        ...state,
        ...payload,
      };

    case 'DELETE_TEMPLATE':
      return omit(state, payload.type ?? payload);

    default:
      return state;
  }
};
