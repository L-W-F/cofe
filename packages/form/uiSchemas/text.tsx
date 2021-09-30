import React from 'react';
import { Textarea } from '@chakra-ui/react';
import { WidgetProps } from '@rjsf/core';

export const text = {
  properties: {
    content: {
      'ui:widget': ({
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
        ...props
      }: WidgetProps) => {
        return (
          <Textarea
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
      },
    },
  },
};
