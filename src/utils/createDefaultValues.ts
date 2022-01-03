import { Tree } from '@cofe/core';
import { CofeApp } from '@cofe/types';
import { makeId } from '@cofe/utils';

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
                  rows: 1,
                  columns: 4,
                },
                children: [
                  {
                    type: 'text',
                    properties: {
                      content: 'C',
                      colorScheme: 'error',
                    },
                  },
                  {
                    type: 'text',
                    properties: {
                      content: 'O',
                      colorScheme: 'warning',
                    },
                  },
                  {
                    type: 'text',
                    properties: {
                      content: 'F',
                      colorScheme: 'info',
                    },
                  },
                  {
                    type: 'text',
                    properties: {
                      content: 'E',
                      colorScheme: 'success',
                    },
                  },
                ],
              },
              {
                type: 'grid',
                properties: {
                  columns: 1,
                },
                children: [
                  {
                    type: 'markdown',
                    properties: {
                      content: '您好，欢迎体验 **COFE** 无代码。',
                      colorScheme: 'error',
                    },
                  },
                  {
                    type: 'markdown',
                    properties: {
                      content:
                        '您可以通过页面顶部的模式按钮切换到编辑、源码或预览模式。',
                      colorScheme: 'warning',
                    },
                  },
                  {
                    type: 'markdown',
                    properties: {
                      content:
                        '您也可以从页面左右边缘拉出组件、模板、属性配置等操作面板。',
                      colorScheme: 'info',
                    },
                  },
                  {
                    type: 'markdown',
                    properties: {
                      content:
                        '您还可以使用一些快捷键，比如使用 ⌘Z、⌘⇧Z 进行“时间旅行”。',
                      colorScheme: 'success',
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
                  {
                    type: 'link',
                    properties: {
                      href: 'https://github.com/crossjs/cofe',
                      isExternal: true,
                    },
                    children: [
                      {
                        type: 'text',
                        properties: {
                          content: 'Source',
                        },
                      },
                    ],
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
