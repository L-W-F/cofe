import { useCallback } from 'react';
import { CofeApp } from '@cofe/types';
import { omit } from 'lodash-es';
import { atom, useRecoilState } from 'recoil';

export const appState = atom<CofeApp>({
  key: 'app',
  default: null,
});

export const useAppState = () => {
  const [app, setApp] = useRecoilState(appState);

  return {
    ...app,
    updateApp: useCallback(
      (payload) => {
        setApp((state) => ({ ...state, ...payload }));
      },
      [setApp],
    ),
    createPage: useCallback(
      (payload) => {
        setApp((state) => ({
          ...state,
          pages: { ...state.pages, [payload.id]: payload },
        }));
      },
      [setApp],
    ),
    updatePage: useCallback(
      (payload) => {
        setApp((state) => ({
          ...state,
          pages: {
            ...state.pages,
            [payload.id]: {
              ...state.pages[payload.id],
              ...payload,
            },
          },
        }));
      },
      [setApp],
    ),
    removePage: useCallback(
      (payload) => {
        setApp((state) => ({
          ...state,
          pages: omit(state.pages, payload.id ?? payload),
        }));
      },
      [setApp],
    ),
  };
};
