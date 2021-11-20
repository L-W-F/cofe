import { useCallback } from 'react';
import { useDispatch, useValue } from '@cofe/store';
import { DndState } from '@/store/dnd';

export const useDnd = () => {
  const data = useValue<DndState>('dnd');
  const actions = useDndActions();

  return {
    ...data,
    ...actions,
  };
};

export const useDndActions = () => {
  const dispatch = useDispatch();

  const reset = useCallback(() => {
    dispatch('RESET_DND')(null);
  }, [dispatch]);

  const setDragging = useCallback(
    (payload) => {
      dispatch('DRAGGING')(payload);
    },
    [dispatch],
  );

  const setSelected = useCallback(
    (payload) => {
      dispatch('SELECTED')(payload);
    },
    [dispatch],
  );

  const setReference = useCallback(
    (payload) => {
      dispatch('REFERENCE')(payload);
    },
    [dispatch],
  );

  const setContainer = useCallback(
    (payload) => {
      dispatch('CONTAINER')(payload);
    },
    [dispatch],
  );

  const setAdjacent = useCallback(
    (payload) => {
      dispatch('ADJACENT')(payload);
    },
    [dispatch],
  );

  return {
    reset,
    setDragging,
    setSelected,
    setReference,
    setContainer,
    setAdjacent,
  };
};
