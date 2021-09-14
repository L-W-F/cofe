import { Flex, FlexProps, useColorMode } from '@chakra-ui/react';

const bgColor = { light: 'gray.50', dark: 'gray.900' };
const color = { light: 'black', dark: 'white' };

export const Container = (props: FlexProps) => {
  const { colorMode } = useColorMode();

  return <Flex bg={bgColor[colorMode]} color={color[colorMode]} {...props} />;
};
