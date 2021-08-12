import React from 'react';
import { Box } from '@chakra-ui/react';
import { Atom } from '@cofe/atoms';
import { Model } from '@cofe/models';
import { CofeTree } from '@cofe/types';
import { DnDHandle } from './DnDHandle';

interface DesignNodeRendererProps extends CofeTree {}

export const DesignNodeRenderer = ({
  type,
  id,
  properties,
  children,
}: DesignNodeRendererProps) => {
  const A = Atom.get(type);

  if (A) {
    const { isInline, isRoot } = Model.get(type);

    return (
      <DnDHandle
        key={id}
        type={type}
        id={id}
        isRoot={isRoot}
        isInline={isInline}
      >
        <A {...properties} pointerEvents="none">
          {children?.map(DesignNodeRenderer)}
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
