import React from 'react';
import { Box } from '@chakra-ui/react';
import { Atom } from '@cofe/atoms';
import { CofeTree } from '@cofe/types';

interface PreviewNodeRendererProps {
  type: string;
  id?: string;
  value?: string;
  properties?: Record<string, any>;
  children?: CofeTree[];
}

export const PreviewNodeRenderer = ({
  type,
  id,
  value,
  properties,
  children,
}: PreviewNodeRendererProps) => {
  const A = Atom.get(type);

  if (A) {
    return (
      <A key={id} id={id} {...properties}>
        {children?.map(PreviewNodeRenderer)}
      </A>
    );
  }

  return (
    <Box key={id} id={id}>
      unknown
    </Box>
  );
};
