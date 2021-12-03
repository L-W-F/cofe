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
import { useDndState } from '@/store/dnd';

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
  const dragRef = useDrag({
    type,
    effectAllowed: 'copy',
  });

  const { dragging } = useDndState();

  const DesignerIcon: ComponentType<IconProps> =
    iconMap[type] ?? AtomUnknownIcon;

  return (
    <VStack
      ref={dragRef}
      p={2}
      spacing={0}
      borderWidth="1px"
      borderRadius="md"
      cursor="move"
      opacity={dragging?.type === type ? 0.25 : 1}
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
