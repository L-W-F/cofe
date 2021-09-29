import { AnyAction } from '@cofe/store';
import { CofeConfig } from '@cofe/types';

export const EDIT_MODE_DESIGN = 1;
export const EDIT_MODE_PREVIEW = 2;

export const initialState: Partial<CofeConfig> = {
  editorMode: EDIT_MODE_DESIGN,
};

export const reducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case 'TOGGLE_EDIT_MODE':
      return {
        ...state,
        editorMode:
          state.editorMode === EDIT_MODE_DESIGN
            ? EDIT_MODE_PREVIEW
            : EDIT_MODE_DESIGN,
      };

    default:
      return state;
  }
};
