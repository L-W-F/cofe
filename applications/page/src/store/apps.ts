import { AnyAction } from '@cofe/store';
import { CofePage } from '@cofe/types';

export type PagesState = CofePage[];

export const initialState: PagesState = [];

export const reducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case 'DELETE_PAGE':
      return state.filter(({ id }: any) => id !== payload);

    case 'INSERT_PAGE':
      return [...state, payload];

    default:
      return state;
  }
};
