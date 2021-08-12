import React from 'react';
import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react';
import { useDrag } from '../../hooks/useDrag';
import { useStore } from '../../store';
import { DndState } from '../../store/modules/dnd';
import { CofeAtomIdentity, CofeInsertAdjacent } from '../../types';

const getAdjacentProps = (
  adjacent?: CofeInsertAdjacent,
  isInline?: boolean,
) => {
  return {
    display: isInline ? 'inline-flex' : 'flex',
    flexDirection: isInline ? 'row' : 'column',
    _before:
      adjacent === 'INSERT_BEFORE'
        ? isInline
          ? {
              content: '""',
              display: 'block',
              position: 'absolute',
              width: '1px',
              top: 0,
              bottom: 0,
              left: '-2px',
              backgroundColor: 'red.500',
            }
          : {
              content: '""',
              display: 'block',
              position: 'absolute',
              height: '1px',
              left: 0,
              right: 0,
              top: '-2px',
              backgroundColor: 'red.500',
            }
        : null,
    _after:
      adjacent === 'INSERT_AFTER'
        ? isInline
          ? {
              content: '""',
              display: 'block',
              position: 'absolute',
              width: '1px',
              top: 0,
              bottom: 0,
              right: '-2px',
              backgroundColor: 'red.500',
            }
          : {
              content: '""',
              display: 'block',
              position: 'absolute',
              height: '1px',
              left: 0,
              right: 0,
              bottom: '-2px',
              backgroundColor: 'red.500',
            }
        : null,
  } as BoxProps;
};

interface DnDHandleProps extends BoxProps {
  type: string;
  id: string;
  isRoot?: boolean;
  isInline?: boolean;
}

export const DnDHandle = ({
  children,
  type,
  id,
  isRoot,
  isInline,
  ...props
}: DnDHandleProps) => {
  const selected = useStore<CofeAtomIdentity>('page.selected');
  const { dragging, reference, container, adjacent } =
    useStore<DndState>('dnd');

  const outlineColors = useColorModeValue(
    ['red.400', 'yellow.400', 'blue.400', 'gray.400'],
    ['red.400', 'yellow.400', 'blue.400', 'gray.400'],
  );

  const [{ isDragging }, drag] = useDrag({
    type,
    id,
    effectAllowed: 'move',
  });

  const isSelected = selected?.id === id;
  const isReference = dragging?.id !== reference?.id && reference?.id === id;
  const isContainer = dragging?.id !== container?.id && container?.id === id;

  const adjacentProps = getAdjacentProps(
    isReference ? adjacent : undefined,
    isInline,
  );

  return (
    <>
      <Box
        ref={isRoot ? null : drag}
        data-id={id}
        data-type={type}
        position="relative"
        pointerEvents="visible"
        minHeight={isRoot ? '100%' : 'initial'}
        padding={2}
        tabIndex={1}
        cursor="move"
        opacity={isDragging ? 0.5 : 1}
        zIndex={isSelected ? 1 : 0}
        outline="1px dashed"
        outlineOffset="-1px"
        outlineColor={
          isContainer
            ? outlineColors[0]
            : isReference
            ? outlineColors[1]
            : isSelected
            ? outlineColors[2]
            : 'transparent'
        }
        _hover={{
          outlineColor: isContainer
            ? outlineColors[0]
            : isReference
            ? outlineColors[1]
            : isSelected
            ? outlineColors[2]
            : outlineColors[3],
        }}
        {...adjacentProps}
        {...props}
      >
        {children}
      </Box>
    </>
  );
};
