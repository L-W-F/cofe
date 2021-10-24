import React from 'react';
import {
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  List,
  ListIcon,
  ListItem,
} from '@chakra-ui/react';

export const FieldTemplate = ({
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
      {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
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
};

if (process.env.NODE_ENV === 'development') {
  FieldTemplate.displayName = 'FieldTemplate';
}
