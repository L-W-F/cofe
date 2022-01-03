import React from 'react';
import {
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  VStack,
} from '@chakra-ui/react';
import { AddIcon, ArrowDownIcon, ArrowUpIcon, DeleteIcon } from '@cofe/icons';
import { ArrayFieldTemplateProps } from '@rjsf/core';

export const ArrayFieldTemplate = ({
  items,
  canAdd,
  onAddClick,
}: ArrayFieldTemplateProps) => {
  return (
    <Flex flexDirection="column" alignItems="stretch" gridGap={4}>
      {items.map(
        ({
          key,
          index,
          hasToolbar,
          hasMoveUp,
          hasMoveDown,
          hasRemove,
          disabled,
          readonly,
          onReorderClick,
          onDropIndexClick,
          children,
        }) => (
          <VStack key={key} spacing={4}>
            {children}
            {hasToolbar && (
              <ButtonGroup isAttached variant="outline">
                {(hasMoveUp || hasMoveDown) && (
                  <IconButton
                    aria-label="上移"
                    icon={<ArrowUpIcon />}
                    tabIndex={-1}
                    disabled={disabled || readonly || !hasMoveUp}
                    onClick={onReorderClick(index, index - 1)}
                  />
                )}

                {(hasMoveUp || hasMoveDown) && (
                  <IconButton
                    aria-label="下移"
                    icon={<ArrowDownIcon />}
                    tabIndex={-1}
                    disabled={disabled || readonly || !hasMoveDown}
                    onClick={onReorderClick(index, index + 1)}
                  />
                )}

                {hasRemove && (
                  <IconButton
                    aria-label="移除此项"
                    icon={<DeleteIcon />}
                    tabIndex={-1}
                    colorScheme="error"
                    onClick={onDropIndexClick(index)}
                  />
                )}
              </ButtonGroup>
            )}
          </VStack>
        ),
      )}
      {canAdd && (
        <Button leftIcon={<AddIcon />} variant="outline" onClick={onAddClick}>
          新增选项
        </Button>
      )}
    </Flex>
  );
};

if (process.env.NODE_ENV === 'development') {
  ArrayFieldTemplate.displayName = 'ArrayFieldTemplate';
}
