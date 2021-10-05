import React from 'react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { ListIcon, ListItem, Tag, TagProps } from '@chakra-ui/react';
import { useDrag } from '@/hooks/useDrag';

interface DragItemProps extends TagProps {
  type: string;
}

export const DragItem = ({ type, ...props }: DragItemProps) => {
  const [{ isDragging }, drag] = useDrag({
    type,
    effectAllowed: 'copy',
  });

  return (
    <ListItem>
      <ListIcon as={ArrowForwardIcon} />
      <Tag
        ref={drag}
        textTransform="capitalize"
        cursor="move"
        opacity={isDragging ? 0.5 : 1}
        {...props}
      >
        {type.replace(/^.+:/, '')}
      </Tag>
    </ListItem>
  );
};
