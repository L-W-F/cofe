import { AnyAction } from '@cofe/store';
import { CofeWhoami } from '@cofe/types';

export type WhoamiState = Partial<CofeWhoami>;

export const initialState: WhoamiState = {};

export const reducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case 'CLEAR_LOGIN':
      return {};

    case 'UPDATE_USER':
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
};
