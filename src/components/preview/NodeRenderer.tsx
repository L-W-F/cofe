import React from 'react';
import { Box } from '@chakra-ui/react';
import { Atom } from '../../Atom';
import { Model } from '../../Model';
import { CofeTree } from '../../types';

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
  const { isLeaf } = Model.get(type);

  if (A) {
    return (
      <A key={id} id={id} {...properties}>
        {isLeaf ? value : children?.map(PreviewNodeRenderer)}
      </A>
    );
  }

  return (
    <Box key={id} id={id}>
      unknown
    </Box>
  );
};
