import React, { memo } from 'react';
import shallowEqual from 'shallowequal';
import { HistoryView } from '../history/HistoryView';
import { Pane } from '../layout/Pane';

export const HistoryPanel = memo(() => {
  return (
    <Pane heading="Histories">
      <HistoryView />
    </Pane>
  );
}, shallowEqual);
