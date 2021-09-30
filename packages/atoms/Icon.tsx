import React from 'react';
import { Icon, IconProps } from '@chakra-ui/react';
import { AtomProps } from './types';

interface IconAtomProps extends AtomProps, IconProps {
  width?: number;
  height?: number;
  color?: string;
  path?: string;
}

export const IconAtom = ({
  isDesign,
  width,
  height,
  color,
  path,
  ...props
}: IconAtomProps) => {
  return (
    <Icon
      viewBox={`0 0 ${width} ${height}`}
      _empty={
        isDesign
          ? {
              '&:before': {
                content: '"Icon"',
                color: 'gray.400',
                height: '1rem',
              },
            }
          : null
      }
      {...props}
    >
      <path fill={color} d={path} />
    </Icon>
  );
};
