import React from 'react';
import { Icon, IconProps } from '@chakra-ui/react';
import { CofeRendererProps } from '@cofe/types';

interface IconRendererProps extends CofeRendererProps, IconProps {
  width?: number;
  height?: number;
  color?: string;
  path?: string;
}

export const IconRenderer = ({
  width,
  height,
  color,
  path,
  ...props
}: IconRendererProps) => {
  return (
    <Icon viewBox={`0 0 ${width} ${height}`} {...props}>
      <path fill={color} d={path} />
    </Icon>
  );
};
