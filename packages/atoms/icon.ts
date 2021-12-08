import { withProps } from '@cofe/form/helpers/withProps';
import { ObjectFieldTemplate } from '@cofe/form/templates/ObjectFieldTemplate';
import { IconRenderer } from './renderers/Icon';

export const icon = {
  type: 'icon',
  isInline: true,
  properties: {
    type: 'object',
    properties: {
      width: {
        type: 'number',
        title: '宽度',
        default: 24,
      },
      height: {
        type: 'number',
        title: '高度',
        default: 24,
      },
      color: {
        type: 'string',
        title: '颜色',
        default: 'currentColor',
      },
      path: {
        type: 'string',
        title: '路径',
        default: 'M 12, 12 m -9, 0 a 9,9 0 1,0 18,0 a 9,9 0 1,0 -18,0',
      },
    },
    required: ['path'],
  },
  uiSchema: {
    properties: {
      'ui:ObjectFieldTemplate': withProps({
        gridGap: 2,
        templateColumns: '1fr 1fr',
        spanMap: {
          width: 1,
          height: 1,
          color: 2,
          path: 2,
        },
      })(ObjectFieldTemplate),
      width: {
        'ui:widget': 'updown',
      },
      height: {
        'ui:widget': 'updown',
      },
      color: {
        'ui:widget': 'color',
      },
      path: {
        'ui:widget': 'textarea',
      },
    },
  },
  renderer: IconRenderer,
};
