import React, { useMemo, useRef } from 'react';
import { Textarea, useToast } from '@chakra-ui/react';
import { useDispatch } from '@cofe/store';
import { useSelectedTree } from '@/hooks/useSelectedTree';

interface SourceCanvasProps {}

export const SourceCanvas = (props: SourceCanvasProps) => {
  const tree = useSelectedTree();
  const dispatch = useDispatch();
  const toast = useToast({
    status: 'error',
    position: 'top',
  });
  const timeoutRef = useRef<any>();

  return (
    <Textarea
      height="100%"
      resize="none"
      defaultValue={useMemo(() => JSON.stringify(tree, null, 2), [tree])}
      onChange={(e) => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        const { value } = e.target;

        timeoutRef.current = setTimeout(() => {
          try {
            dispatch('PUSH')(JSON.parse(value));
          } catch (error) {
            toast({
              title: error.message,
            });
          }
        }, 500);
      }}
    />
  );
};

if (process.env.NODE_ENV === 'development') {
  SourceCanvas.displayName = 'SourceCanvas';
}
