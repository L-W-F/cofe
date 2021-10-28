import { AnyAction } from '@cofe/store';
import { CofeDbApp, CofeDbPage } from '@cofe/types';
import { omit } from 'lodash';
import { a2m } from '@/utils/a2m';

export type AppState = Record<
  string,
  CofeDbApp & {
    pages?: Record<string, CofeDbPage>;
  }
>;

export const initialState: AppState = {};

export const reducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case 'FETCH_APPS':
      return a2m(payload);

    case 'CREATE_APP':
    case 'UPDATE_APP':
      return {
        ...state,
        [payload.id]: {
          ...state[payload.id],
          ...payload,
        },
      };

    case 'DELETE_APP':
      return omit(state, payload.id ?? payload);

    case 'FETCH_PAGES':
      if (!payload?.length) {
        return state;
      }

      return {
        ...state,
        [payload[0].app_id]: {
          ...state[payload[0].app_id],
          pages: a2m(payload),
        },
      };

    case 'UPDATE_PAGE':
      return {
        ...state,
        [payload.app_id]: {
          ...state[payload.app_id],
          pages: {
            ...state[payload.app_id].pages,
            [payload.id]: {
              ...state[payload.app_id].pages[payload.id],
              ...payload,
            },
          },
        },
      };

    case 'DELETE_PAGE':
      return {
        ...state,
        [payload.app_id]: {
          ...state[payload.app_id],
          pages: omit(state[payload.app_id].pages, payload.id),
        },
      };

    case 'CREATE_PAGE':
      return {
        ...state,
        [payload.app_id]: {
          ...state[payload.app_id],
          pages: {
            ...state[payload.app_id].pages,
            [payload.id]: payload,
          },
        },
      };

    default:
      return state;
  }
};
