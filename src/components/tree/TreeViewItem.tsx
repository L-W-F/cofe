import React, { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Flex, List, ListItem } from '@chakra-ui/react';
import { useDispatch, useStore } from '../../store';
import { TreeViewTag } from './TreeViewTag';

export const TreeViewItem = ({ level = 0, type, id, children }) => {
  const selected = useStore('page.selected');
  const [isCollapsed, setIsCollapsed] = useState(true);
  const dispatch = useDispatch();

  const ToggleCollapsedIcon = isCollapsed ? ChevronRightIcon : ChevronDownIcon;
  const isSelected = selected?.id === id;

  return (
    <ListItem
      onClick={(e) => {
        e.stopPropagation();
        dispatch('SELECT_NODE')({ type, id });
      }}
    >
      {children ? (
        <Flex
          direction={isCollapsed ? 'row' : 'column'}
          alignItems={isCollapsed ? 'center' : 'start'}
        >
          <TreeViewTag isSelected={isSelected} indent={level} title={id}>
            <ToggleCollapsedIcon
              onClick={() => setIsCollapsed((v) => !v)}
              mx={'1px'}
            />
            {`<${type}>`}
          </TreeViewTag>
          {isCollapsed ? (
            <TreeViewTag isSelected={isSelected}>...</TreeViewTag>
          ) : (
            <List>
              {children.map((props) => (
                <TreeViewItem key={props.id} level={level + 1} {...props} />
              ))}
            </List>
          )}
          <TreeViewTag
            isSelected={isSelected}
            indent={isCollapsed ? 0 : level}
            title={id}
          >
            {`</${type}>`}
          </TreeViewTag>
        </Flex>
      ) : (
        <TreeViewTag
          isSelected={isSelected}
          indent={level}
          title={id}
        >{`<${type} />`}</TreeViewTag>
      )}
    </ListItem>
  );
};
