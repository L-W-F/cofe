import React, { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  BoxProps,
  List,
  ListItem,
} from '@chakra-ui/react';
import { useDispatch, useStore } from '@cofe/store';
import { useSelectedTree } from '@/hooks/useSelectedTree';

interface TreeItemTagProps extends BoxProps {
  isSelected?: boolean;
  indent?: number;
}

const TreeItemTag = ({
  isSelected,
  indent = 0,
  ...props
}: TreeItemTagProps) => {
  return (
    <Box
      cursor="default"
      alignItems="center"
      pl={indent * 4}
      fontSize="sm"
      whiteSpace="nowrap"
      sx={{
        backgroundColor: isSelected ? 'gray.100' : '',
        '&:hover': {
          backgroundColor: 'gray.200',
        },
        '&:active': {
          backgroundColor: 'gray.300',
        },
      }}
      {...props}
    />
  );
};

const TreeItem = ({ level = 0, type, id, children }) => {
  const selected = useStore('editor.selected');
  const [isCollapsed, setIsCollapsed] = useState(true);
  const dispatch = useDispatch();

  const ChevronIcon = isCollapsed ? ChevronRightIcon : ChevronDownIcon;
  const isSelected = selected?.id === id;

  return (
    <ListItem
      onClick={(e) => {
        e.stopPropagation();
        dispatch('SELECT_NODE')({ type, id });
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
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            组件树
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel>
        <List>
          <TreeItem {...tree} />
        </List>
      </AccordionPanel>
    </AccordionItem>
  );
};
