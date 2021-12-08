import { ButtonRenderer } from './renderers/Button';

export const button = {
  type: 'button',
  accept: ['text', 'icon'],
  isInline: true,
  properties: {
    type: 'object',
    properties: {
      disabled: {
        type: 'boolean',
      },
      // fullWidth: {
      //   type: 'boolean',
      //   default: false,
      // },
      // variant: {
      //   type: 'string',
      //   enum: ['contained', 'outlined', 'ghost', 'text'],
      //   default: 'contained',
      // },
    },
  },
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
  renderer: ButtonRenderer,
};
