import { useCallback } from 'react';
import { studioStore } from '@/store';
import { EditorState } from '@/store/editor';

type K = Parameters<typeof studioStore.useValue>[0];

type D = Parameters<typeof studioStore.useValue>[1];

export const useEditor = (...args: Parameters<typeof studioStore.useValue>) => {
  const data = useEditorValue(...args);
  const actions = useEditorActions();

  return {
    ...data,
    ...actions,
  };
};

export const useEditorValue = <T = EditorState>(
  key: K = 'editor',
  deps?: D,
) => {
  return studioStore.useValue<T>(key, deps);
};

export const useEditorActions = () => {
  const dispatch = studioStore.useDispatch();

  const switchMode = useCallback(
    (payload) => {
      dispatch('SWITCH_MODE')(payload);
    },
    [dispatch],
  );

  const switchPage = useCallback(
    (payload) => {
      dispatch('SWITCH_PAGE')(payload);
    },
    [dispatch],
  );

  const undo = useCallback(() => {
    dispatch('UNDO')(null);
  }, [dispatch]);

  const redo = useCallback(() => {
    dispatch('REDO')(null);
  }, [dispatch]);

  const push = useCallback(
    (payload) => {
      dispatch('PUSH')(payload);
    },
    [dispatch],
  );

  const appendNode = useCallback(
    (payload) => {
      dispatch('APPEND_NODE')(payload);
    },
    [dispatch],
  );

  const updateNode = useCallback(
    (payload) => {
      dispatch('UPDATE_NODE')(payload);
    },
    [dispatch],
  );

  const deleteNode = useCallback(
    (payload) => {
      dispatch('DELETE_NODE')(payload);
    },
    [dispatch],
  );

  const duplicateNode = useCallback(
    (payload) => {
      dispatch('DUPLICATE_NODE')(payload);
    },
    [dispatch],
  );

  return {
    switchMode,
    switchPage,
    undo,
    redo,
    push,
    appendNode,
    updateNode,
    deleteNode,
    duplicateNode,
  };
};
