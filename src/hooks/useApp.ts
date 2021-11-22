import { useCallback } from 'react';
import { makeId } from '@cofe/utils';
import { appStore } from '@/store';
import { AppState } from '@/store/app';

type K = Parameters<typeof appStore.useValue>[0];

type D = Parameters<typeof appStore.useValue>[1];

export const useApp = (...args: Parameters<typeof appStore.useValue>) => {
  const data = useAppValue(...args);
  const actions = useAppActions();

  return {
    ...data,
    ...actions,
  };
};

export const useAppValue = <T = AppState>(key: K = 'app', deps?: D) => {
  return appStore.useValue<T>(key, deps);
};

export const useAppActions = () => {
  const dispatch = appStore.useDispatch();

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
