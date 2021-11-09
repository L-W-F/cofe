import React from 'react';
import { useStore } from '@cofe/store';
import { Paper, PaperProps } from '@cofe/ui';
import { DesignCanvas } from './DesignCanvas';
import { PreviewCanvas } from './PreviewCanvas';
import { SourceCanvas } from './SourceCanvas';
import { EditorState, MODE_DESIGN, MODE_SOURCE } from '@/store/editor';

export const CanvasPanel = (props: PaperProps) => {
  const mode = useStore<EditorState['mode']>('editor.mode');

  const Canvas =
    mode === MODE_DESIGN
      ? DesignCanvas
      : mode === MODE_SOURCE
      ? SourceCanvas
      : PreviewCanvas;

  return (
    <Paper flex={1} p={4} {...props}>
      <Canvas />
    </Paper>
  );
};
