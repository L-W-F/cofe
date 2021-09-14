import { AnyAction } from '@cofe/store';
import { CofeConfig } from '@cofe/types';

export interface ConfigState extends CofeConfig {}

export const initialState: ConfigState = {
  editMode: true,
};

export const reducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case 'TOGGLE_EDIT_MODE':
      return {
        ...state,
        editMode: !state.editMode,
      };

    case 'SET_LEFT_PANE_SIZE':
      if (state.leftPaneSize === payload) {
        return state;
      }

      return {
        ...state,
        leftPaneSize: payload,
      };

    case 'SET_RIGHT_PANE_SIZE':
      if (state.rightPaneSize === payload) {
        return state;
      }

      return {
        ...state,
        rightPaneSize: payload,
      };

    default:
      return state;
  }
};
