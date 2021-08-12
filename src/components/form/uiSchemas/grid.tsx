import React, { Fragment } from 'react';
import { Flex } from '@chakra-ui/react';

export const grid = {
  schema: {
    'ui:ObjectFieldTemplate': ({ title, description, properties }) => {
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
