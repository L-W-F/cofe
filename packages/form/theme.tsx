import React, { Fragment } from 'react';
import {
  Checkbox,
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  List,
  ListIcon,
  ListItem,
  Select,
} from '@chakra-ui/react';
import { ThemeProps } from '@rjsf/core';

export const theme: ThemeProps = {
  children: ' ',
  liveOmit: true,
  liveValidate: true,
  omitExtraData: true,
  showErrorList: false,
  FieldTemplate: ({
    id,
    disabled,
    hidden,
    label,
    required,
    rawDescription,
    children,
    rawErrors,
  }) => {
    return hidden ? null : (
      <FormControl
        isDisabled={disabled}
        isRequired={required}
        isInvalid={Boolean(rawErrors)}
      >
        <FormLabel htmlFor={id}>{label}</FormLabel>
        {children}
        <FormErrorMessage>
          <List>
            {rawErrors?.map((message, index) => (
              <ListItem key={index}>
                <ListIcon as={FormErrorIcon} />
                {message}
              </ListItem>
            ))}
          </List>
        </FormErrorMessage>
        <FormHelperText>{rawDescription}</FormHelperText>
      </FormControl>
    );
  },
  ObjectFieldTemplate: ({ title, description, properties }) => {
    return (
      <>
        {title}
        {properties.map(({ name, content }) => (
          <Fragment key={name}>{content}</Fragment>
        ))}
        {description}
      </>
    );
  },
  widgets: {
    TextWidget: ({
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
    }) => {
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
    },
    SelectWidget: ({
      id,
      autofocus,
      readonly,
      required,
      disabled,
      rawErrors,
      value,
      options: { enumOptions, enumDisabled },
      onFocus,
      onBlur,
      onChange,
    }) => {
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
    },
    CheckboxWidget: ({
      id,
      autofocus,
      readonly,
      required,
      disabled,
      rawErrors,
      value,
      label,
      onFocus,
      onBlur,
      onChange,
    }) => {
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
    },
  },
};
