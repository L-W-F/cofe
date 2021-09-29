import React from 'react';
import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react';
import { Atom } from '@cofe/atoms';
import { Model } from '@cofe/models';
import { useDispatch, useStore } from '@cofe/store';
import { CofeAtomIdentity, CofeInsertAdjacent, CofeTree } from '@cofe/types';
import { isMac } from '@cofe/utils';
import { pick } from 'lodash';
import { useDrag } from '@/hooks/useDrag';
import { useDrop } from '@/hooks/useDrop';
import { DndState } from '@/store/dnd';

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

const DnDHandle = ({
  children,
  type,
  id,
  isRoot,
  isInline,
  ...props
}: DnDHandleProps) => {
  const selected = useStore<CofeAtomIdentity>('editor.selected');
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

interface DesignNodeRendererProps extends CofeTree {}

const DesignNodeRenderer = ({
  type,
  id,
  properties,
  children,
}: DesignNodeRendererProps) => {
  const A = Atom.get(type);

  if (A) {
    const { isInline, isRoot } = Model.get(type);

    return (
      <DnDHandle
        key={id}
        type={type}
        id={id}
        isRoot={isRoot}
        isInline={isInline}
      >
        <A {...properties} isDesign pointerEvents="none">
          {children?.map(DesignNodeRenderer)}
        </A>
      </DnDHandle>
    );
  }

  return (
    <Box key={id} id={id}>
      unknown
    </Box>
  );
};

interface DesignCanvasProps extends BoxProps {
  tree: CofeTree;
}

export const DesignCanvas = ({ tree, ...props }: DesignCanvasProps) => {
  const dispatch = useDispatch();

  const handleKeyDown = async (e: any) => {
    // Delete
    // ⌘+Backspace
    if (e.key === 'Delete' || (e.key === 'Backspace' && isMac && e.metaKey)) {
      dispatch('DELETE_NODE')(null);

      e.currentTarget.focus();
    }

    // Escape
    if (e.key === 'Escape') {
      dispatch('SELECT_NODE')(null);

      e.currentTarget.focus();
    }
  };

  const handleFocus = (e) => {
    if (e.target.dataset) {
      dispatch('SELECT_NODE')(pick(e.target.dataset, ['type', 'id']));
    } else {
      dispatch('SELECT_NODE')(null);
    }
  };

  const cellColor = useColorModeValue(
    'var(--chakra-colors-blackAlpha-200)',
    'var(--chakra-colors-whiteAlpha-50)',
  );

  const [, drop] = useDrop({
    onDrop: (payload) => {
      dispatch('DROPPING_NODE')(payload);
    },
  });

  return (
    <Box
      ref={drop}
      bgImage={`
      linear-gradient(45deg, ${cellColor} 25%, transparent 25%),
      linear-gradient(-45deg, ${cellColor} 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, ${cellColor} 75%),
      linear-gradient(-45deg, transparent 75%, ${cellColor} 75%);
      `}
      bgSize="20px 20px"
      bgPosition="0 0, 0 10px, 10px -10px, -10px 0px"
      tabIndex={0}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <DesignNodeRenderer {...tree} />
    </Box>
  );
};
