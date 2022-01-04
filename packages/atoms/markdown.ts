import { SelectWidget } from '@cofe/form/widgets/SelectWidget';
import { TextareaWidget } from '@cofe/form/widgets/TextareaWidget';
import { CofeAtom } from '@cofe/types';
import { MarkdownRenderer } from './renderers/Markdown';
import { hues } from './utils/colors';

export const markdown: CofeAtom = {
  type: 'markdown',
  properties: {
    type: 'object',
    properties: {
      content: {
        type: 'string',
        title: '内容',
        description: '支持 Markdown 语法',
      },
      colorScheme: {
        type: 'string',
        title: '色调',
        enum: hues,
        default: 'gray',
      },
    },
    required: ['content'],
  },
  form: {
    content: {
      'ui:widget': TextareaWidget,
    },
    colorScheme: {
      'ui:widget': SelectWidget,
    },
  },
  icon: 'M 3.0000001,15.461538 V 8.0769226 H 4.846154 L 7.6153847,10.846153 10.384615,8.0769226 H 12.23077 V 15.461538 H 10.384615 V 10.68923 L 7.6153847,13.458461 4.846154,10.68923 v 4.772308 H 3.0000001 M 15.923077,8.0769226 h 2.769231 V 11.769231 H 21 l -3.692307,4.153846 -3.692309,-4.153846 h 2.307693 z',
  renderer: MarkdownRenderer,
};
