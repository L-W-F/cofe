import React from 'react';
import {
  Flex,
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  List,
  ListIcon,
  ListItem,
} from '@chakra-ui/react';
import { FieldTemplateProps } from '@rjsf/core';

export const FieldTemplate = ({
  id,
  disabled,
  readonly,
  hidden,
  label,
  required,
  rawDescription,
  rawHelp,
  children,
  rawErrors,
}: FieldTemplateProps) => {
  return hidden ? null : (
    <FormControl
      isDisabled={disabled}
      isReadOnly={readonly}
      isRequired={required}
      isInvalid={Boolean(rawErrors)}
      id={id}
      as={Flex}
      flexDirection="column"
    >
      {label && <FormLabel>{label}</FormLabel>}
      {children}
      {Boolean(rawErrors) && (
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
      )}
      {rawDescription && <FormHelperText>{rawDescription}</FormHelperText>}
      {rawHelp && <FormHelperText>{rawHelp}</FormHelperText>}
    </FormControl>
  );
};

if (process.env.NODE_ENV === 'development') {
  FieldTemplate.displayName = 'FieldTemplate';
}
