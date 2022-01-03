import React, { useState } from 'react';
import {
  Box,
  Button,
  chakra,
  Grid,
  Icon,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import * as atoms from '@cofe/atoms';
import { Tree } from '@cofe/core';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  DragHandleIcon,
  SmallAddIcon,
} from '@cofe/icons';
import { CofeTree } from '@cofe/types';
import { Paper, PaperProps } from '@cofe/ui';
import { isMobile } from '@cofe/utils';
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { Schema } from '@/../packages/core';
import { useDndState } from '@/store/dnd';
import { useSelectedTree, useTreeNodeActions } from '@/store/editor';

interface NodeItemProps extends Partial<CofeTree> {
  level?: number;
  isSortable?: boolean;
}

const NodeItem = ({
  level = 0,
  isSortable,
  properties,
  type,
  id,
  children,
}: NodeItemProps) => {
  const {
    isSorting,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });
  const { select } = useDndState();
  const { append } = useTreeNodeActions();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <ListItem
      ref={setNodeRef}
      transform={
        transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : null
      }
      transition={transition}
      {...attributes}
    >
      <Grid
        role="group"
        alignItems="center"
        fontSize="sm"
        pl={`${level * 8 * 4}px`}
      >
        <Button
          gridArea="1/1"
          leftIcon={
            <Icon viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d={atoms[type]?.icon ?? atoms.unknown.icon}
              />
            </Icon>
          }
          py={1}
          pl={children ? 9 : 1}
          pr={isSortable ? 9 : 1}
          cursor="pointer"
          borderRadius="md"
          variant="ghost"
          justifyContent="flex-start"
          onClick={(e) => {
            e.stopPropagation();
            select({ type, id });
          }}
        >
          {properties?.content ? (
            <chakra.span
              fontWeight="normal"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {properties.content}
            </chakra.span>
          ) : (
            <chakra.span textTransform="capitalize">{type}</chakra.span>
          )}
        </Button>
        {children && (
          <IconButton
            gridArea="1/1"
            justifySelf="flex-start"
            aria-label={isCollapsed ? '展开' : '折叠'}
            icon={isCollapsed ? <ChevronRightIcon /> : <ChevronDownIcon />}
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed((v) => !v)}
          />
        )}
        {isSortable && (
          <IconButton
            gridArea="1/1"
            justifySelf="flex-end"
            aria-label="移动"
            icon={<DragHandleIcon />}
            variant="ghost"
            size="sm"
            cursor={isSorting ? 'grabbing' : 'grab'}
            visibility="hidden"
            _groupHover={{ visibility: 'visible' }}
            {...listeners}
          />
        )}
      </Grid>
      {!children || isCollapsed ? null : (
        <NodeList nodes={children} level={level + 1} />
      )}
      {!atoms[type]?.accept?.length || isCollapsed ? null : (
        <Box pl={`${(level + 1) * 8 * 4}px`}>
          <Menu>
            <MenuButton
              as={Button}
              leftIcon={<SmallAddIcon />}
              rightIcon={<ChevronDownIcon />}
              gridArea="1/1"
              p={1}
              cursor="pointer"
              borderRadius="md"
              variant="ghost"
              justifyContent="flex-start"
            >
              <chakra.span fontWeight="normal">添加子节点</chakra.span>
            </MenuButton>
            <MenuList>
              {Object.values(atoms).map((atom) =>
                Schema.isAccepted(atoms[type]?.accept, atom.type) ? (
                  <MenuItem
                    icon={
                      <Icon viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d={atom.icon ?? atoms.unknown.icon}
                        />
                      </Icon>
                    }
                    textTransform="capitalize"
                    onClick={() => {
                      append({
                        from: Tree.create(atom.type),
                        to: id,
                      });
                    }}
                  >
                    {atom.type}
                  </MenuItem>
                ) : null,
              )}
            </MenuList>
          </Menu>
        </Box>
      )}
    </ListItem>
  );
};

if (process.env.NODE_ENV === 'development') {
  NodeItem.displayName = 'NodeItem';
}

interface NodeListProps {
  nodes: CofeTree['children'];
  level?: number;
}

const NodeList = ({ nodes = [], level = 0 }: NodeListProps) => {
  const sensors = useSensors(useSensor(isMobile ? TouchSensor : MouseSensor));
  const { insert } = useTreeNodeActions();

  const items = nodes.map((node) => node.id);

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={(e) => {
        if (!e.active || !e.over) {
          return;
        }

        if (e.active.id === e.over.id) {
          return;
        }

        insert({
          from: e.active.id,
          to: e.over.id,
          position: e.delta.y > 0 ? 'after' : 'before',
        });
      }}
    >
      <SortableContext items={items.length > 1 ? items : []}>
        <List>
          {nodes.map((node) => (
            <NodeItem
              key={node.id}
              level={level}
              isSortable={items.length > 1}
              {...node}
            />
          ))}
        </List>
      </SortableContext>
    </DndContext>
  );
};

if (process.env.NODE_ENV === 'development') {
  NodeList.displayName = 'NodeList';
}

export const TreePanel = (props: PaperProps) => {
  const tree = useSelectedTree();

  return (
    <Paper overflow="auto" borderRadius={0} p={2} {...props}>
      <List>
        <NodeItem {...tree} />
      </List>
    </Paper>
  );
};

if (process.env.NODE_ENV === 'development') {
  TreePanel.displayName = 'TreePanel';
}
