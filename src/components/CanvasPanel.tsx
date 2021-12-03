import React, { useEffect } from 'react';
import { Paper, PaperProps } from '@cofe/ui';
import { DesignCanvas } from './DesignCanvas';
import { PreviewCanvas } from './PreviewCanvas';
import { SourceCanvas } from './SourceCanvas';
import { useAppActions, useAppValue } from '@/store/app';
import {
  MODE_DESIGN,
  MODE_SOURCE,
  useEditorId,
  useEditorMode,
  useSelectedTree,
  useSwitchPage,
} from '@/store/editor';

export const CanvasPanel = (props: PaperProps) => {
  const { pages } = useAppValue();
  const { updatePage } = useAppActions();
  const switchPage = useSwitchPage();
  const tree = useSelectedTree();
  const id = useEditorId();
  const mode = useEditorMode();
  const Canvas =
    mode === MODE_DESIGN
      ? DesignCanvas
      : mode === MODE_SOURCE
      ? SourceCanvas
      : PreviewCanvas;

  // 自动保存页面
  useEffect(() => {
    if (id && tree) {
      updatePage({ id, tree });
    }
  }, [updatePage, id, tree]);

  // 自动切换页面
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

if (process.env.NODE_ENV === 'development') {
  CanvasPanel.displayName = 'CanvasPanel';
}
