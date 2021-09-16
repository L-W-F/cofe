import React from 'react';
import { CheckIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  List,
  ListIcon,
  ListItem,
} from '@chakra-ui/react';
import { useDispatch, useStore } from '@cofe/store';
import { EditorState } from 'store/editor';

export const HistoryPanel = () => {
  const { stack, cursor } = useStore<EditorState>('editor');
  const dispatch = useDispatch();

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            历史记录
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel>
        <List display="flex" flexDirection="column-reverse">
          {stack.map(({ createdAt }, index) => {
            return (
              <ListItem
                key={createdAt ?? index}
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
                {createdAt
                  ? new Intl.DateTimeFormat('zh-CN', {
                      hourCycle: 'h24',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    }).format(createdAt)
                  : 'Unknown'}
              </ListItem>
            );
          })}
        </List>
      </AccordionPanel>
    </AccordionItem>
  );
};
