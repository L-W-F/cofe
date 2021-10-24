import { ThemeProps } from '@rjsf/core';
import { ArrayFieldTemplate } from './templates/ArrayFieldTemplate';
import { FieldTemplate } from './templates/FieldTemplate';
import { ObjectFieldTemplate } from './templates/ObjectFieldTemplate';
import { CheckboxWidget } from './widgets/CheckboxWidget';
import { SelectWidget } from './widgets/SelectWidget';
import { TextWidget } from './widgets/TextWidget';

export const theme: ThemeProps = {
  children: ' ',
  liveOmit: true,
  liveValidate: true,
  omitExtraData: true,
  showErrorList: false,
  FieldTemplate,
  ArrayFieldTemplate,
  ObjectFieldTemplate,
  widgets: {
    TextWidget,
    SelectWidget,
    CheckboxWidget,
  },
};
