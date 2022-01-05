import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { create } from 'react-test-renderer';
import { withSx } from './withSx';

test('withSx', () => {
  const Test = withSx('Test')((props) => <>{JSON.stringify(props)}</>);

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
