import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

interface TreeViewTagProps extends BoxProps {
  isSelected?: boolean;
  indent?: number;
}

export const TreeViewTag = ({
  isSelected,
  indent = 0,
  ...props
}: TreeViewTagProps) => {
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
