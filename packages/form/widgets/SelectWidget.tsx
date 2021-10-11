import React from 'react';
import { Select } from '@chakra-ui/react';
import { WidgetProps } from '@rjsf/core';

export const SelectWidget = ({
  id,
  autofocus,
  readonly,
  required,
  disabled,
  rawErrors,
  value = '',
  options: { enumOptions, enumDisabled },
  onFocus,
  onBlur,
  onChange,
}: WidgetProps) => {
  return (
    <Select
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
    >
      {(enumOptions as any).map((item) => (
        <option
          key={item.value}
          value={item.value}
          disabled={(enumDisabled as any)?.includes(item.value) ?? false}
        >
          {item.label}
        </option>
      ))}
    </Select>
  );
};

if (process.env.NODE_ENV === 'development') {
  SelectWidget.displayName = 'SelectWidget';
}
