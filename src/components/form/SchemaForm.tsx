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
} from '@chakra-ui/react';
import { ThemeProps, withTheme } from '@rjsf/core';

const theme: ThemeProps = {
  children: ' ',
  liveValidate: true,
  showErrorList: false,
  FieldTemplate: ({
    id,
    disabled,
    label,
    required,
    rawDescription,
    children,
    rawErrors,
  }) => {
    return (
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
    TextWidget: ({ id, disabled, value = '', onChange }) => {
      return (
        <Input
          id={id}
          isDisabled={disabled}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
      );
    },
    CheckboxWidget: ({ id, disabled, label, value, onChange }) => {
      return (
        <Checkbox
          id={id}
          isDisabled={disabled}
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

export const SchemaForm = withTheme(theme);
