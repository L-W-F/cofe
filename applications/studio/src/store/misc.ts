import { AnyAction } from '@cofe/store';
import { CofeMisc } from '@cofe/types';

export type MiscState = CofeMisc;

export const initialState: MiscState = {
  is_loading: false,
};

export const reducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case 'SET_IS_LOADING':
      return {
        ...state,
        is_loading: payload,
      };

    default:
      return state;
  }
};
