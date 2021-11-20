import { AnyAction } from '@cofe/store';
import { CofeApp } from '@cofe/types';
import { omit } from 'lodash-es';

export type AppState = CofeApp;

export const initialState: AppState = null;

export const reducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case 'CREATE_APP':
      return payload;

    case 'UPDATE_APP':
      return {
        ...state,
        ...payload,
      };

    case 'DELETE_APP':
      return null;

    case 'CREATE_PAGE':
      return {
        ...state,
        pages: {
          ...state.pages,
          [payload.id]: payload,
        },
      };

    case 'UPDATE_PAGE':
      return {
        ...state,
        pages: {
          ...state.pages,
          [payload.id]: {
            ...state.pages[payload.id],
            ...payload,
          },
        },
      };

    case 'DELETE_PAGE':
      return {
        ...state,
        pages: omit(state.pages, payload.id ?? payload),
      };

    default:
      return state;
  }
};
