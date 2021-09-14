import React, { memo } from 'react';
import shallowEqual from 'shallowequal';
import { AtomsPanel } from './panel/AtomsPanel';
import { EntriesPanel } from './panel/EntriesPanel';
import { HistoryPanel } from './panel/HistoryPanel';
import { TreePanel } from './panel/TreePanel';

export const LeftPane = memo(
  () => (
    <>
      <EntriesPanel />
      <HistoryPanel />
      <TreePanel />
      <AtomsPanel />
    </>
  ),
  shallowEqual,
);
