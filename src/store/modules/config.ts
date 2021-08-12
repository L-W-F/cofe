import { AnyAction } from 'redux';

export interface ConfigState {
  editMode?: boolean;
  leftPaneSize?: number;
  rightPaneSize?: number;
}

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
