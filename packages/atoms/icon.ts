import { ObjectFieldTemplate } from '@cofe/form/templates/ObjectFieldTemplate';
import { CofeAtom } from '@cofe/types';
import { withDefaultProps } from './helpers/withDefaultProps';
import { IconRenderer } from './renderers/Icon';

export const icon: CofeAtom = {
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
  form: {
    'ui:ObjectFieldTemplate': withDefaultProps({
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
  icon: 'm 12,10.5 c 0.554,0 1,0.446 1,1 v 4 c 0,0.554 -0.446,1 -1,1 -0.554,0 -1,-0.446 -1,-1 v -4 c 0,-0.554 0.446,-1 1,-1 z m 0,-3.0000002 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z M 12,4 a 8,8 0 0 0 -8,8 8,8 0 0 0 8,8 8,8 0 0 0 8,-8 8,8 0 0 0 -8,-8 z m 0,1 a 7,7 0 0 1 7,7 7,7 0 0 1 -7,7 7,7 0 0 1 -7,-7 7,7 0 0 1 7,-7 z',
  renderer: IconRenderer,
};
