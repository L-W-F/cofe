import { useCallback } from 'react';
import { Tree } from '@cofe/core';
import { CofeApp } from '@cofe/types';
import { makeId } from '@cofe/utils';
import { omit } from 'lodash-es';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

export const createDefaultValues = (): CofeApp => ({
  id: makeId(),
  title: '默认应用',
  pages: (() => {
    const id = makeId();

    return {
      [id]: {
        id,
        title: '默认页面',
        tree: Tree.create({
          type: 'template:',
          template: {
            type: 'fragment',
            children: [
              {
                type: 'fragment',
                children: [
                  {
                    type: 'fragment',
                    children: [
                      {
                        type: 'text',
                        properties: {
                          content: '您好',
                        },
                      },
                    ],
                  },
                  {
                    type: 'button',
                    children: [
                      {
                        type: 'icon',
                      },
                      {
                        type: 'text',
                        properties: {
                          content: '开始',
                        },
                      },
                    ],
                  },
                ],
              },
              {
                type: 'grid',
                properties: {
                  rows: 2,
                  columns: 2,
                },
                children: [
                  {
                    type: 'text',
                    properties: {
                      content: '我',
                    },
                  },
                  {
                    type: 'text',
                    properties: {
                      content: '是',
                    },
                  },
                  {
                    type: 'text',
                    properties: {
                      content: '*文*',
                    },
                  },
                  {
                    type: 'text',
                    properties: {
                      content: '**D**',
                    },
                  },
                ],
              },
            ],
          },
        }),
      },
    };
  })(),
});

export const appState = atom<CofeApp>({
  key: 'app',
  default: null,
});

export const useAppValue = () => {
  return useRecoilValue(appState);
};

export const useAppActions = () => {
  const setApp = useSetRecoilState(appState);

  return {
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
