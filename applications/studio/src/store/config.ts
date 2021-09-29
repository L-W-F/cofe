import { AnyAction } from '@cofe/store';
import { CofeConfig } from '@cofe/types';

export const initialState: Partial<CofeConfig> = {
  editMode: true,
};

export const reducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case 'TOGGLE_EDIT_MODE':
      return {
        ...state,
        editMode: !state.editMode,
      };

    default:
      return state;
  }
};
