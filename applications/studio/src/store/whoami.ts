import { AnyAction } from '@cofe/store';
import { CofeWhoami } from '@cofe/types';

export const initialState: Partial<CofeWhoami> = {
  config: {
    editMode: true,
  },
};

export const reducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case 'CLEAR_LOGIN':
      return {
        config: {},
      };

    case 'TOGGLE_EDIT_MODE':
      return {
        ...state,
        config: {
          ...state.config,
          editMode: !state.config.editMode,
        },
      };

    case 'SET_LEFT_PANE_SIZE':
      if (state.config.leftPaneSize === payload) {
        return state;
      }

      return {
        ...state,
        config: {
          ...state.config,
          leftPaneSize: payload,
        },
      };

    case 'SET_RIGHT_PANE_SIZE':
      if (state.config.rightPaneSize === payload) {
        return state;
      }

      return {
        ...state,
        config: {
          ...state.config,
          rightPaneSize: payload,
        },
      };

    default:
      return state;
  }
};
