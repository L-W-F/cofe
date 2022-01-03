import React from 'react';
import { Link, LinkProps } from '@chakra-ui/react';
import { CofeRendererProps } from '@cofe/types';

interface LinkRendererProps extends CofeRendererProps, LinkProps {}

export const LinkRenderer = (props: LinkRendererProps) => {
  return <Link {...props} />;
};
