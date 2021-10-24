import React from 'react';
import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react';
import { Renderer } from '@cofe/core';
import { useDispatch, useStore } from '@cofe/store';
import { CofeDndAdjacent, CofeDndIdentity, CofeTree } from '@cofe/types';
import { isMac } from '@cofe/utils';
import { pick } from 'lodash';
import { ContextMenu } from './ContextMenu';
import { useContextMenu } from '@/hooks/useContextMenu';
import { useDrag } from '@/hooks/useDrag';
import { useDrop } from '@/hooks/useDrop';
import { useSchema } from '@/hooks/useSchema';
import { useSelectedTree } from '@/hooks/useSelectedTree';
import { DndState } from '@/store/dnd';

const getAdjacentProps = (adjacent?: CofeDndAdjacent, isInline?: boolean) => {
  return {
    display: isInline ? 'inline-block' : 'block',
    // flexDirection: isInline ? 'row' : 'column',
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
  isRoot?: boolean;
  type: string;
  id: string;
}

const outlineColors = ['red.400', 'yellow.400', 'blue.400', 'gray.400'];

const DnDHandle = ({
  children,
  isRoot,
  type,
  id,
  ...props
}: DnDHandleProps) => {
  const selected = useStore<CofeDndIdentity>('dnd.selected');
  const { dragging, reference, container, adjacent } =
    useStore<DndState>('dnd');
  const [{ isDragging }, dragRef] = useDrag({
    type,
    id,
    effectAllowed: 'move',
  });

  const isSelected = selected?.id === id;
  const isReference = dragging?.id !== reference?.id && reference?.id === id;
  const isContainer = dragging?.id !== container?.id && container?.id === id;

  const schema = useSchema(type);

  const adjacentProps = getAdjacentProps(
    isReference ? adjacent : undefined,
    schema.isInline,
  );

  return (
    <Box
      ref={isRoot ? null : dragRef}
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
  );
};

interface NodeRendererProps extends CofeTree {
  isRoot?: boolean;
}

const NodeRenderer = ({
  isRoot,
  type,
  id,
  properties,
  actions,
  children,
}: NodeRendererProps) => {
  const R = Renderer.get(type);

  if (R) {
    return (
      <DnDHandle key={id} isRoot={isRoot} type={type} id={id}>
        <R {...properties} actions={actions} isDesign pointerEvents="none">
          {children?.map(NodeRenderer)}
        </R>
      </DnDHandle>
    );
  }

  return (
    <Box key={id} type={type} id={id}>
      未知节点
    </Box>
  );
};

interface DesignCanvasProps extends BoxProps {}

export const DesignCanvas = (props: DesignCanvasProps) => {
  const tree = useSelectedTree();
  const selected = useStore<DndState['selected']>('dnd.selected');
  const dispatch = useDispatch();
  const { triggerProps, ...contextMenuProps } = useContextMenu();

  const handleKeyDown = async (e) => {
    // Delete
    // ⌘+Backspace
    if (e.key === 'Delete' || (e.key === 'Backspace' && isMac && e.metaKey)) {
      dispatch('DELETE_NODE')(selected);

      e.currentTarget.focus();
    }

    // Escape
    if (e.key === 'Escape') {
      dispatch('SELECTED')(null);

      e.currentTarget.focus();
    }
  };

  const handleFocus = (e) => {
    if (e.target.dataset) {
      dispatch('SELECTED')(pick(e.target.dataset, ['type', 'id']));
    } else {
      dispatch('SELECTED')(null);
    }
  };

  const cellColor = useColorModeValue(
    'var(--chakra-colors-blackAlpha-200)',
    'var(--chakra-colors-whiteAlpha-50)',
  );

  const [, dropRef] = useDrop({
    onDrop: (payload) => {
      dispatch('APPEND_NODE')(payload);
    },
  });

  return (
    <>
      <Box
        ref={dropRef}
        bgImage={`
        linear-gradient(45deg, ${cellColor} 25%, transparent 25%),
        linear-gradient(-45deg, ${cellColor} 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, ${cellColor} 75%),
        linear-gradient(-45deg, transparent 75%, ${cellColor} 75%);
        `}
        bgSize="20px 20px"
        bgPosition="0 0, 0 10px, 10px -10px, -10px 0px"
        tabIndex={0}
        minHeight="100%"
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        {...triggerProps}
        {...props}
      >
        <NodeRenderer isRoot {...tree} />
      </Box>
      <ContextMenu {...contextMenuProps} />
    </>
  );
};

if (process.env.NODE_ENV === 'development') {
  DesignCanvas.displayName = 'DesignCanvas';
}
