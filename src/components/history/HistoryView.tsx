import React from 'react';
import { CheckIcon, DeleteIcon } from '@chakra-ui/icons';
import { List, ListIcon, ListItem } from '@chakra-ui/react';
import { useDispatch, useStore } from '../../store';
import { PageState } from '../../store/modules/page';

export const HistoryView = () => {
  const { stack, cursor } = useStore<PageState>('page');
  const dispatch = useDispatch();

  return (
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
  );
};
