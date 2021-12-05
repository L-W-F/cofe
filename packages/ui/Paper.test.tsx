import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { create } from 'react-test-renderer';
import { Paper } from './Paper';

test('Paper', () => {
  const component = create(
    <ChakraProvider>
      <Paper>Paper</Paper>
    </ChakraProvider>,
  );

  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
