import { withProps } from '../helpers/withProps';
import { ObjectFieldTemplate } from '../templates/ObjectFieldTemplate';
import { UpDownWidget } from '../widgets/UpDownWidget';

export const grid = {
  properties: {
    'ui:ObjectFieldTemplate': withProps({
      gridGap: 2,
      templateColumns: '1fr 1fr',
      spanMap: {
        rows: 1,
        columns: 1,
        placeItems: 2,
      },
    })(ObjectFieldTemplate),
    rows: {
      'ui:widget': UpDownWidget,
    },
    columns: {
      'ui:widget': UpDownWidget,
    },
  },
};
