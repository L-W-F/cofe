import React from 'react';
import { Input } from '@chakra-ui/react';
import { WidgetProps } from '@rjsf/core';

export const TextWidget = ({
  id,
  autofocus,
  readonly,
  required,
  disabled,
  rawErrors,
  value,
  onFocus,
  onBlur,
  onChange,
}: WidgetProps) => {
  return (
    <Input
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
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
};

if (process.env.NODE_ENV === 'development') {
  TextWidget.displayName = 'TextWidget';
}
