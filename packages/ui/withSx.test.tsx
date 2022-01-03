import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { create } from 'react-test-renderer';
import { withSx } from './withSx';

test('withSx', () => {
  const Test = withSx('Test')(({ borderRadius }) => (
    <>{JSON.stringify(borderRadius)}</>
  ));

  const component = create(
    <ChakraProvider
      theme={extendTheme({
        components: {
          Test: {
            baseStyle: {
              borderRadius: 'md',
            },
          },
        },
      })}
    >
      <Test />
    </ChakraProvider>,
  );

  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
