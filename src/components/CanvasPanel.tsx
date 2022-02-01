import React, { useEffect } from 'react';
import { Paper, PaperProps } from '@cofe/ui';
import { PreviewCanvas } from './PreviewCanvas';
import { useAppState } from '@/store/app';
import { useEditorId, useSelectedTree, useSwitchPage } from '@/store/editor';

export const CanvasPanel = (props: PaperProps) => {
  const { pages, updatePage } = useAppState();
  const switchPage = useSwitchPage();
  const selectedNode = useSelectedTree();
  const id = useEditorId();

  // 自动保存页面
  useEffect(() => {
    if (id && selectedNode) {
      updatePage({ id, tree: selectedNode });
    }
  }, [updatePage, id, selectedNode]);

  // 自动切换页面
  useEffect(() => {
    if (!pages[id]) {
      for (const key in pages) {
        return switchPage(pages[key]);
      }
    }
  }, [id, pages, switchPage]);

  return (
    <Paper
      overflow="auto"
      flex={0}
      borderRadius={0}
      shadow="none"
      m={2}
      p={4}
      {...props}
    >
      {pages[id] ? <PreviewCanvas /> : null}
    </Paper>
  );
};

if (process.env.NODE_ENV === 'development') {
  CanvasPanel.displayName = 'CanvasPanel';
}
