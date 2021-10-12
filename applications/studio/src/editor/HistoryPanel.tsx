import React from 'react';
import { CheckIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  List,
  ListIcon,
  ListItem,
  Text,
} from '@chakra-ui/react';
import { useDispatch, useStore } from '@cofe/store';
import { EditorState } from 'store/editor';

export const HistoryPanel = () => {
  const { stack, cursor } = useStore<EditorState>('editor');
  const dispatch = useDispatch();

  return (
    <AccordionItem>
      <AccordionButton>
        <AccordionIcon />
        <Text as="h2">历史记录</Text>
      </AccordionButton>
      <AccordionPanel>
        <List display="flex" flexDirection="column-reverse">
          {stack.map(({ created_at }, index) => {
            return (
              <ListItem
                key={created_at ?? index}
                onClick={() => {
                  dispatch('JUMP')(index);
                }}
              >
                {index === cursor ? (
                  <ListIcon as={CheckIcon} />
                ) : (
                  <ListIcon
                    aria-label="Delete"
                    as={DeleteIcon}
                    sx={{ cursor: 'pointer' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch('DELETE')(index);
                    }}
                  />
                )}
                {created_at
                  ? new Intl.DateTimeFormat('zh-CN', {
                      hourCycle: 'h24',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    }).format(created_at)
                  : 'Unknown'}
              </ListItem>
            );
          })}
        </List>
      </AccordionPanel>
    </AccordionItem>
  );
};

if (process.env.NODE_ENV === 'development') {
  HistoryPanel.displayName = 'HistoryPanel';
}
