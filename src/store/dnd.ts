import { useCallback } from 'react';
import { CofeDndAdjacent, CofeDndIdentity } from '@cofe/types';
import { isEqual } from 'lodash-es';
import { atom, useRecoilState } from 'recoil';

export interface DndState {
  dragging?: CofeDndIdentity;
  selected?: CofeDndIdentity;
  reference?: CofeDndIdentity;
  container?: CofeDndIdentity;
  adjacent?: CofeDndAdjacent;
}

export const dndState = atom<DndState>({
  key: 'dnd',
  default: {
    dragging: null,
    selected: null,
    reference: null,
    container: null,
    adjacent: null,
  },
});

export const useDndState = () => {
  const [dnd, setDnd] = useRecoilState(dndState);

  return {
    ...dnd,
    reset: useCallback(
      () =>
        setDnd({
          dragging: null,
          reference: null,
          container: null,
          adjacent: null,
        }),
      [setDnd],
    ),
    drag: useCallback(
      (payload) => {
        setDnd((state) =>
          isEqual(state.dragging, payload)
            ? state
            : {
                ...state,
                dragging: payload,
                selected: payload,
              },
        );
      },
      [setDnd],
    ),
    select: useCallback(
      (payload) => {
        setDnd((state) =>
          state.selected?.id === payload?.id
            ? state
            : {
                ...state,
                selected: payload,
              },
        );
      },
      [setDnd],
    ),
    setReference: useCallback(
      (payload) => {
        setDnd((state) =>
          isEqual(state.reference, payload)
            ? state
            : {
                ...state,
                reference: payload,
              },
        );
      },
      [setDnd],
    ),
    setContainer: useCallback(
      (payload) => {
        setDnd((state) =>
          isEqual(state.container, payload)
            ? state
            : {
                ...state,
                container: payload,
              },
        );
      },
      [setDnd],
    ),
    setAdjacent: useCallback(
      (payload) => {
        setDnd((state) =>
          state.adjacent === payload
            ? state
            : {
                ...state,
                adjacent: payload,
              },
        );
      },
      [setDnd],
    ),
  };
};
