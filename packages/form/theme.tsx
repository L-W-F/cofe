import { ThemeProps } from '@rjsf/core';
import { ArrayFieldTemplate } from './templates/ArrayFieldTemplate';
import { FieldTemplate } from './templates/FieldTemplate';
import { ObjectFieldTemplate } from './templates/ObjectFieldTemplate';
import { CheckboxWidget } from './widgets/CheckboxWidget';
import { ColorWidget } from './widgets/ColorWidget';
import { SelectWidget } from './widgets/SelectWidget';
import { TextareaWidget } from './widgets/TextareaWidget';
import { TextWidget } from './widgets/TextWidget';
import { UpDownWidget } from './widgets/UpDownWidget';

export const theme: ThemeProps = {
  children: ' ',
  liveValidate: true,
  omitExtraData: true,
  showErrorList: false,
  transformErrors: (errors) => errors,
  FieldTemplate,
  ArrayFieldTemplate,
  ObjectFieldTemplate,
  widgets: {
    CheckboxWidget,
    ColorWidget,
    SelectWidget,
    TextWidget,
    TextareaWidget,
    UpDownWidget,
  },
};
