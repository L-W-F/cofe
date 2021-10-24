import React from 'react';
import { Box, Flex, IconButton } from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@cofe/icons';
import { ArrayFieldTemplateProps } from '@rjsf/core';

export const ArrayFieldTemplate = ({
  title,
  items,
  canAdd,
  onAddClick,
}: ArrayFieldTemplateProps) => {
  return (
    <>
      {/* {title} */}
      <Box>
        {items.map(({ key, index, hasRemove, onDropIndexClick, children }) => (
          <Flex key={key} gridGap={2}>
            <Box flex={1}>{children}</Box>
            {hasRemove && (
              <IconButton
                aria-label="移除此项"
                icon={<DeleteIcon />}
                size="xs"
                variant="solid"
                colorScheme="red"
                onClick={onDropIndexClick(index)}
              />
            )}
          </Flex>
        ))}
        <Flex gridGap={2}>
          <Box flex={1} />
          {canAdd && (
            <IconButton
              aria-label="新增选项"
              icon={<AddIcon />}
              size="xs"
              variant="solid"
              colorScheme="teal"
              onClick={onAddClick}
            />
          )}
        </Flex>
      </Box>
    </>
  );
};

if (process.env.NODE_ENV === 'development') {
  ArrayFieldTemplate.displayName = 'ArrayFieldTemplate';
}
