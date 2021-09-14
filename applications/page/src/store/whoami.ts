import { AnyAction } from '@cofe/store';
import { WhoamiState } from '@cofe/types';

export const initialState: WhoamiState = {};

export const reducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    default:
      return state;
  }
};
