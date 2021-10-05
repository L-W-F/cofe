import React from 'react';
import { Link, LinkProps } from '@chakra-ui/react';
import { CofeRendererProps } from '@cofe/types';

interface LinkRendererProps extends CofeRendererProps, LinkProps {}

export const LinkRenderer = ({ isDesign, ...props }: LinkRendererProps) => {
  return (
    <Link
      _empty={
        isDesign
          ? {
              '&:before': {
                content: '"Link"',
                color: 'gray.400',
                height: '1rem',
              },
            }
          : null
      }
      {...props}
    />
  );
};
