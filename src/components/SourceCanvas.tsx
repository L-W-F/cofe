import React, { useMemo, useRef } from 'react';
import { Textarea, useToast } from '@chakra-ui/react';
import { useSelectedTree, useStackActions } from '@/store/editor';

interface SourceCanvasProps {}

export const SourceCanvas = (props: SourceCanvasProps) => {
  const selectedTree = useSelectedTree();
  const { push } = useStackActions();
  const toast = useToast({
    status: 'error',
    position: 'top',
  });
  const timeoutRef = useRef<any>();

  return (
    <Textarea
      fontFamily="mono"
      height="100%"
      resize="none"
      whiteSpace="pre"
      value={useMemo(
        () => JSON.stringify(selectedTree, null, 4),
        [selectedTree],
      )}
      onChange={(e) => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        const { value } = e.target;

        timeoutRef.current = setTimeout(() => {
          try {
            push(JSON.parse(value));
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
