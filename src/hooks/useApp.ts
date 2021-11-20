import { useCallback } from 'react';
import { useDispatch, useValue } from '@cofe/store';
import { makeId } from '@cofe/utils';
import { AppState } from '@/store/app';

type K = Parameters<typeof useValue>[0];

type D = Parameters<typeof useValue>[1];

export const useApp = (...args: Parameters<typeof useValue>) => {
  const data = useAppValue(...args);
  const actions = useAppActions();

  return {
    ...data,
    ...actions,
  };
};

export const useAppValue = <T = AppState>(key: K = 'app', deps?: D) => {
  return useValue<T>(key, deps);
};

export const useAppActions = () => {
  const dispatch = useDispatch();

  const createApp = useCallback(
    (payload) => {
      dispatch('CREATE_APP')({ id: makeId(), ...payload });
    },
    [dispatch],
  );

  const updateApp = useCallback(
    (payload) => {
      dispatch('UPDATE_APP')(payload);
    },
    [dispatch],
  );

  const deleteApp = useCallback(
    (payload) => {
      dispatch('DELETE_APP')(payload);
    },
    [dispatch],
  );

  const createPage = useCallback(
    (payload) => {
      dispatch('CREATE_PAGE')({
        id: makeId(),
        ...payload,
      });
    },
    [dispatch],
  );

  const updatePage = useCallback(
    (payload) => {
      dispatch('UPDATE_PAGE')(payload);
    },
    [dispatch],
  );

  const deletePage = useCallback(
    (payload) => {
      dispatch('DELETE_PAGE')(payload);
    },
    [dispatch],
  );

  return {
    createApp,
    updateApp,
    deleteApp,
    createPage,
    updatePage,
    deletePage,
  };
};
