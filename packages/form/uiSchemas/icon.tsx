import { withProps } from '../helpers/withProps';
import { ObjectFieldTemplate } from '../templates/ObjectFieldTemplate';
import { ColorWidget } from '../widgets/ColorWidget';
import { TextareaWidget } from '../widgets/TextareaWidget';
import { UpDownWidget } from '../widgets/UpDownWidget';

export const icon = {
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
      'ui:widget': UpDownWidget,
    },
    height: {
      'ui:widget': UpDownWidget,
    },
    color: {
      'ui:widget': ColorWidget,
    },
    path: {
      'ui:widget': TextareaWidget,
    },
  },
};
