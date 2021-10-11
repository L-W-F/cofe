import React from 'react';
import { Checkbox } from '@chakra-ui/react';
import { WidgetProps } from '@rjsf/core';

export const CheckboxWidget = ({
  id,
  autofocus,
  readonly,
  required,
  disabled,
  rawErrors,
  value = '',
  label,
  onFocus,
  onBlur,
  onChange,
}: WidgetProps) => {
  return (
    <Checkbox
      id={id}
      autoFocus={autofocus}
      isReadOnly={readonly}
      isRequired={required}
      isDisabled={disabled}
      isInvalid={!!rawErrors}
      value={value}
      onFocus={() => {
        onFocus(id, value);
      }}
      onBlur={() => {
        onBlur(id, value);
      }}
      isChecked={value}
      onChange={(e) => {
        onChange(e.target.checked);
      }}
    >
      {label}
    </Checkbox>
  );
};

if (process.env.NODE_ENV === 'development') {
  CheckboxWidget.displayName = 'CheckboxWidget';
}
