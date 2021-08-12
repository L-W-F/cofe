import React, { memo } from 'react';
import shallowEqual from 'shallowequal';
import { AtomsPanel } from './panel/AtomsPanel';
import { HistoryPanel } from './panel/HistoryPanel';
import { TreePanel } from './panel/TreePanel';

export const LeftPane = memo(
  () => (
    <>
      <HistoryPanel />
      <TreePanel />
      <AtomsPanel />
    </>
  ),
  shallowEqual,
);
