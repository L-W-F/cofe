import React, { Fragment } from 'react';
import { Flex } from '@chakra-ui/react';
import { ObjectFieldTemplateProps } from '@rjsf/core';

export const grid = {
  properties: {
    'ui:ObjectFieldTemplate': ({
      title,
      description,
      properties,
    }: ObjectFieldTemplateProps) => {
      return (
        <>
          {title}
          <Flex>
            {properties.map(({ name, content }) => (
              <Fragment key={name}>{content}</Fragment>
            ))}
          </Flex>
          {description}
        </>
      );
    },
  },
};
