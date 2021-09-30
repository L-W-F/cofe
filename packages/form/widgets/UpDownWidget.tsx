import React from 'react';
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import { WidgetProps } from '@rjsf/core';

export const UpDownWidget = ({
  id,
  autofocus,
  readonly,
  required,
  disabled,
  rawErrors,
  value,
  schema: { minimum, maximum },
  onFocus,
  onBlur,
  onChange,
}: WidgetProps) => {
  return (
    <NumberInput
      isReadOnly={readonly}
      isRequired={required}
      isDisabled={disabled}
      isInvalid={!!rawErrors}
      value={value}
      min={minimum}
      max={maximum}
      onFocus={() => {
        onFocus(id, value);
      }}
      onBlur={() => {
        onBlur(id, value);
      }}
      onChange={(s, valueAsNumber) => {
        onChange(valueAsNumber);
      }}
    >
      <NumberInputField id={id} autoFocus={autofocus} />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};

if (process.env.NODE_ENV === 'development') {
  UpDownWidget.displayName = 'UpDownWidget';
}
