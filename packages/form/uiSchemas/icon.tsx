import { TextareaWidget } from '../widgets/TextareaWidget';
import { UpDownWidget } from '../widgets/UpDownWidget';

export const icon = {
  properties: {
    width: {
      'ui:widget': UpDownWidget,
    },
    height: {
      'ui:widget': UpDownWidget,
    },
    path: {
      'ui:widget': TextareaWidget,
    },
  },
};
