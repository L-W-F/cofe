import { AnyAction } from '@cofe/store';
import { CofeWhoami } from '@cofe/types';

export const initialState: Partial<CofeWhoami> = {};

export const reducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case 'CLEAR_LOGIN':
      return {};

    default:
      return state;
  }
};
