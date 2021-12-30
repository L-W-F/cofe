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
          type: 'molecule:',
          pattern: {
            type: 'fragment',
            children: [
              {
                type: 'grid',
                properties: {
                  columns: 1,
                },
                children: [
                  {
                    type: 'text',
                    properties: {
                      content: '您好，欢迎体验 **COFE** 无代码。',
                    },
                  },
                  {
                    type: 'text',
                    properties: {
                      content:
                        '您可以通过页面顶部的模式按钮切换到编辑、源码或预览模式。',
                    },
                  },
                  {
                    type: 'text',
                    properties: {
                      content:
                        '您也可以从页面左右边缘拉出组件、模板、属性配置等操作面板。',
                    },
                  },
                  {
                    type: 'text',
                    properties: {
                      content:
                        '您还可以使用一些快捷键，比如使用 ⌘Z、⌘⇧Z 进行“时间旅行”。',
                    },
                  },
                ],
              },
              {
                type: 'grid',
                properties: {
                  rows: 1,
                  columns: 1,
                },
                children: [
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
                      {
                        type: 'icon',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'grid',
                properties: {
                  rows: 1,
                  columns: 4,
                },
                children: [
                  {
                    type: 'text',
                    properties: {
                      content: 'C',
                    },
                  },
                  {
                    type: 'text',
                    properties: {
                      content: 'O',
                    },
                  },
                  {
                    type: 'text',
                    properties: {
                      content: 'F',
                    },
                  },
                  {
                    type: 'text',
                    properties: {
                      content: 'E',
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
