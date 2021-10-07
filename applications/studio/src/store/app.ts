import { AnyAction } from '@cofe/store';
import { CofeDbApp } from '@cofe/types';

export type AppState = CofeDbApp[];

export const initialState: AppState = [];

export const reducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case 'UPDATE_APP':
      const index = state.findIndex((app) => app.id === payload.id);

      return [
        ...state.slice(0, index),
        {
          ...state[index],
          ...payload,
        },
        ...state.slice(index + 1),
      ];

    case 'DELETE_APP':
      return state.filter(({ id }: any) => id !== payload);

    case 'CREATE_APP':
      return [...state, payload];

    default:
      return state;
  }
};
