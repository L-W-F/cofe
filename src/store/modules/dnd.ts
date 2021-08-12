import { isEqual } from 'lodash';
import { AnyAction } from 'redux';
import { CofeAtomIdentity, CofeInsertAdjacent } from '../../types';

export interface DndState {
  dragging?: CofeAtomIdentity;
  reference?: CofeAtomIdentity;
  container?: CofeAtomIdentity;
  adjacent?: CofeInsertAdjacent;
}

export const initialState: DndState = {
  dragging: null,
  reference: null,
  container: null,
  adjacent: null,
};

export const reducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case 'DRAGGING':
      if (isEqual(state.dragging, payload)) {
        return state;
      }

      return {
        ...state,
        dragging: payload,
      };

    case 'REFERENCE':
      if (payload) {
        if (isEqual(payload, state.reference)) {
          return state;
        }
      }

      return {
        ...state,
        adjacent: payload ? state.adjacent : null,
        reference: payload,
      };

    case 'CONTAINER':
      if (payload) {
        if (isEqual(payload, state.container)) {
          return state;
        }
      }

      return {
        ...state,
        container: payload,
      };

    case 'ADJACENT':
      if (payload) {
        if (payload === state.adjacent) {
          return state;
        }
      }

      return {
        ...state,
        adjacent: payload,
      };

    default:
      return state;
  }
};
