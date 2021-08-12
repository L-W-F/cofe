import React from 'react';
import { Box } from '@chakra-ui/react';
import { Atom } from '../../Atom';
import { Model } from '../../Model';
import { CofeTree } from '../../types';
import { DnDHandle } from './DnDHandle';

interface DesignNodeRendererProps {
  type: string;
  id?: string;
  value?: string;
  properties?: Record<string, any>;
  children?: CofeTree[];
}

export const DesignNodeRenderer = ({
  type,
  id,
  value,
  properties,
  children,
}: DesignNodeRendererProps) => {
  const A = Atom.get(type);

  if (A) {
    const { isInline, isRoot, isLeaf } = Model.get(type);

    return (
      <DnDHandle
        key={id}
        type={type}
        id={id}
        isRoot={isRoot}
        isInline={isInline}
      >
        <A {...properties} pointerEvents="none">
          {isLeaf ? value : children?.map(DesignNodeRenderer)}
        </A>
      </DnDHandle>
    );
  }

  return (
    <Box key={id} id={id}>
      unknown
    </Box>
  );
};
