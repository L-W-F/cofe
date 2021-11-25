import React, { ComponentType } from 'react';
import { IconProps, StackProps, Text, VStack } from '@chakra-ui/react';
import {
  AtomButtonIcon,
  AtomFragmentIcon,
  AtomGridIcon,
  AtomIconIcon,
  AtomLinkIcon,
  AtomTextIcon,
  AtomUnknownIcon,
} from '@cofe/icons';
import { useDrag } from '@/hooks/useDrag';

interface DragItemProps extends StackProps {
  type: string;
}

const iconMap = {
  button: AtomButtonIcon,
  fragment: AtomFragmentIcon,
  grid: AtomGridIcon,
  icon: AtomIconIcon,
  link: AtomLinkIcon,
  text: AtomTextIcon,
};

export const DragItem = ({ type, ...props }: DragItemProps) => {
  const [{ isDragging }, drag] = useDrag({
    type,
    effectAllowed: 'copy',
  });

  const DesignerIcon: ComponentType<IconProps> =
    iconMap[type] ?? AtomUnknownIcon;

  return (
    <VStack
      ref={drag}
      p={2}
      spacing={0}
      borderWidth="1px"
      borderRadius="md"
      cursor="move"
      opacity={isDragging ? 0.25 : 1}
      {...props}
    >
      <DesignerIcon boxSize={8} />
      <Text textTransform="capitalize">{type.replace(/^.+:/, '')}</Text>
    </VStack>
  );
};

if (process.env.NODE_ENV === 'development') {
  DragItem.displayName = 'DragItem';
}
