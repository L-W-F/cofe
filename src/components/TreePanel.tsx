import React, { useEffect, useState } from 'react';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  BoxProps,
  List,
  ListItem,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronRightIcon } from '@cofe/icons';
import { CofeTree } from '@cofe/types';
import { useDndState } from '@/store/dnd';
import { useSelectedPath, useSelectedTree } from '@/store/editor';

interface TreeItemTagProps extends BoxProps {
  isSelected?: boolean;
  indent?: number;
}

const TreeItemTag = ({
  isSelected,
  indent = 0,
  ...props
}: TreeItemTagProps) => {
  const bgColors = useColorModeValue(
    ['blackAlpha.100', 'blackAlpha.200', 'blackAlpha.400'],
    ['whiteAlpha.100', 'whiteAlpha.200', 'whiteAlpha.400'],
  );

  return (
    <Box
      cursor="default"
      alignItems="center"
      my={1}
      pl={indent * 4}
      fontSize="sm"
      borderRadius="sm"
      whiteSpace="nowrap"
      textTransform="capitalize"
      sx={{
        backgroundColor: isSelected ? bgColors[0] : '',
        '&:hover': {
          backgroundColor: bgColors[1],
        },
        '&:active': {
          backgroundColor: bgColors[2],
        },
      }}
      {...props}
    />
  );
};

interface TreeItemProps extends Partial<CofeTree> {
  level?: number;
}

const TreeItem = ({ level = 0, type, id, children }: TreeItemProps) => {
  const selectedPath = useSelectedPath();
  const { select } = useDndState();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const ChevronIcon = isCollapsed ? ChevronRightIcon : ChevronDownIcon;
  const isSelected = selectedPath[0]?.id === id;

  useEffect(() => {
    setIsCollapsed(selectedPath.findIndex((node) => node.id === id) === -1);
  }, [id, selectedPath]);

  return (
    <ListItem
      onClick={(e) => {
        e.stopPropagation();
        select({ type, id });
      }}
    >
      {children ? (
        <>
          <TreeItemTag isSelected={isSelected} indent={level} title={id}>
            <ChevronIcon onClick={() => setIsCollapsed((v) => !v)} mx={'1px'} />
            {type}
          </TreeItemTag>
          {isCollapsed ? null : (
            <List>
              {children.map((props) => (
                <TreeItem key={props.id} level={level + 1} {...props} />
              ))}
            </List>
          )}
        </>
      ) : (
        <TreeItemTag isSelected={isSelected} indent={level} title={id}>
          {type}
        </TreeItemTag>
      )}
    </ListItem>
  );
};

export const TreePanel = () => {
  const tree = useSelectedTree();

  return (
    <AccordionItem>
      <AccordionButton>
        <AccordionIcon />
        <Text as="h2">组件树</Text>
      </AccordionButton>
      <AccordionPanel>
        <List>
          <TreeItem {...tree} />
        </List>
      </AccordionPanel>
    </AccordionItem>
  );
};

if (process.env.NODE_ENV === 'development') {
  TreePanel.displayName = 'TreePanel';
}
