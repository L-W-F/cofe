import React, { forwardRef } from 'react';
import {
  Icon,
  StackProps,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';

interface DragItemProps extends StackProps {
  type: string;
  icon?: string;
}

const defaultIcon =
  'm 10.6,12 c 0,0.331371 -0.268629,0.6 -0.6,0.6 -0.3313708,0 -0.6,-0.268629 -0.6,-0.6 0,-0.331371 0.2686292,-0.6 0.6,-0.6 0.331371,0 0.6,0.268629 0.6,0.6 m 4,0 c 0,0.331371 -0.268629,0.6 -0.6,0.6 -0.331371,0 -0.6,-0.268629 -0.6,-0.6 0,-0.331371 0.268629,-0.6 0.6,-0.6 0.331371,0 0.6,0.268629 0.6,0.6 m -2,0 c 0,0.331371 -0.268629,0.6 -0.6,0.6 -0.331371,0 -0.6,-0.268629 -0.6,-0.6 0,-0.331371 0.268629,-0.6 0.6,-0.6 0.331371,0 0.6,0.268629 0.6,0.6 z M 3.9921875,6 C 3.4426967,6 3,6.4374357 3,6.9804688 V 17.019531 C 3,17.562564 3.4426967,18 3.9921875,18 H 20.007812 C 20.557303,18 21,17.562564 21,17.019531 V 6.9804688 C 21,6.4374357 20.557303,6 20.007812,6 Z M 4.5,7 h 15 C 19.777,7 20,7.223 20,7.5 v 9 C 20,16.777 19.777,17 19.5,17 H 4.5 C 4.223,17 4,16.777 4,16.5 v -9 C 4,7.223 4.223,7 4.5,7 Z';

export const DragItem = forwardRef<HTMLDivElement, DragItemProps>(
  ({ type, icon = defaultIcon, ...props }, ref) => {
    return (
      <VStack
        ref={ref}
        p={2}
        spacing={0}
        borderWidth="1px"
        borderRadius="md"
        bgColor={useColorModeValue('whiteAlpha.500', 'blackAlpha.500')}
        _hover={{
          bgColor: useColorModeValue('whiteAlpha.800', 'blackAlpha.800'),
        }}
        {...props}
      >
        <Icon viewBox="0 0 24 24" boxSize={8}>
          <path fill="currentColor" d={icon} />
        </Icon>
        <Text textTransform="capitalize">{type.replace(/^.+:/, '')}</Text>
      </VStack>
    );
  },
);

if (process.env.NODE_ENV === 'development') {
  DragItem.displayName = 'DragItem';
}
