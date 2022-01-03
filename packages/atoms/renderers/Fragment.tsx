import React, { Fragment, ReactNode } from 'react';
import { CofeRendererProps } from '@cofe/types';

interface FragmentRendererProps extends CofeRendererProps {
  children?: ReactNode;
}

export const FragmentRenderer = ({ children }: FragmentRendererProps) => {
  return <Fragment>{children}</Fragment>;
};
