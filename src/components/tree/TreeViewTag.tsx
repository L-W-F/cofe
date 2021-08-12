import React from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';

interface TreeViewTagProps extends FlexProps {
  isSelected?: boolean;
  indent?: number;
}

export const TreeViewTag = ({
  isSelected,
  indent = 0,
  ...props
}: TreeViewTagProps) => {
  return (
    <Flex
      cursor="default"
      alignItems="center"
      pl={indent * 4}
      fontSize="sm"
      whiteSpace="nowrap"
      sx={{
        backgroundColor: isSelected ? 'gray.300' : '',
        '&:hover': {
          backgroundColor: isSelected ? 'gray.300' : 'gray.100',
        },
        '&:active': {
          backgroundColor: 'gray.300',
        },
      }}
      {...props}
    />
  );
};
