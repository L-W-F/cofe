import React from 'react';
import { Input, InputProps } from '@chakra-ui/react';
import { WidgetProps } from '@rjsf/core';

export interface TextWidgetProps extends WidgetProps {
  InputProps?: InputProps;
}

export const TextWidget = ({
  id,
  autofocus,
  readonly,
  required,
  disabled,
  rawErrors,
  value = '',
  onFocus,
  onBlur,
  onChange,
  InputProps: props,
}: TextWidgetProps) => {
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
      {...props}
    />
  );
};

if (process.env.NODE_ENV === 'development') {
  TextWidget.displayName = 'TextWidget';
}
