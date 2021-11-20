import React, { useEffect } from 'react';
import { Paper, PaperProps } from '@cofe/ui';
import { DesignCanvas } from './DesignCanvas';
import { PreviewCanvas } from './PreviewCanvas';
import { SourceCanvas } from './SourceCanvas';
import { useAppActions, useAppValue } from '@/hooks/useApp';
import { useEditor } from '@/hooks/useEditor';
import { MODE_DESIGN, MODE_SOURCE } from '@/store/editor';

export const CanvasPanel = (props: PaperProps) => {
  const { pages } = useAppValue();
  const { updatePage } = useAppActions();
  const { mode, id, stack, cursor, switchPage } = useEditor();

  const Canvas =
    mode === MODE_DESIGN
      ? DesignCanvas
      : mode === MODE_SOURCE
      ? SourceCanvas
      : PreviewCanvas;

  // 自动保存当前编辑器数据到页面
  useEffect(() => {
    updatePage({ id, tree: stack[cursor] });
  }, [updatePage, id, stack, cursor]);

  useEffect(() => {
    if (!pages[id]) {
      for (const key in pages) {
        return switchPage(pages[key]);
      }
    }
  }, [id, pages, switchPage]);

  return (
    <Paper flex={1} p={4} {...props}>
      {pages[id] ? <Canvas /> : null}
    </Paper>
  );
};
