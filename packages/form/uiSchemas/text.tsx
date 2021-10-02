// import { withProps } from '../helpers/withProps';
// import { ObjectFieldTemplate } from '../templates/ObjectFieldTemplate';
import { TextareaWidget } from '../widgets/TextareaWidget';

export const text = {
  properties: {
    // 'ui:ObjectFieldTemplate': withProps({
    //   gridGap: 2,
    //   templateColumns: '1fr 1fr',
    //   spanMap: {
    //     rows: 1,
    //     columns: 1,
    //     placeItems: 2,
    //   },
    // })(ObjectFieldTemplate),
    content: {
      'ui:widget': TextareaWidget,
    },
  },
};
