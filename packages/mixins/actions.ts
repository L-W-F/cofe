import { Schema } from '@cofe/core';

Schema.add({
  type: 'mixin:actions',
  actions: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          title: '事件类型',
          default: 'onClick',
          enum: ['onClick'],
        },
        payload: {
          type: 'object',
          oneOf: [
            {
              title: '页面跳转',
              properties: {
                action: {
                  type: 'string',
                  default: 'goto',
                  enum: ['goto'],
                },
                params: {
                  type: 'string',
                  // format: 'source:page',
                },
              },
              required: ['params'],
            },
            {
              title: '日志打印',
              properties: {
                action: {
                  type: 'string',
                  default: 'console',
                  enum: ['console'],
                },
                params: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                },
              },
              required: ['params'],
            },
          ],
        },
      },
      required: ['type', 'payload'],
    },
  },
});
