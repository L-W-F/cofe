import { AnyAction } from '@cofe/store';
import { CofePage } from '@cofe/types';

export type PageState = CofePage[];

export const initialState: PageState = [];

export const reducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case 'UPDATE_PAGE':
      const index = state.findIndex((page) => page.id === payload.id);

      return [
        ...state.slice(0, index),
        {
          ...state[index],
          ...payload,
        },
        ...state.slice(index + 1),
      ];

    case 'DELETE_PAGE':
      return state.filter(({ id }: any) => id !== payload);

    case 'CREATE_PAGE':
      return [...state, payload];

    default:
      return state;
  }
};
