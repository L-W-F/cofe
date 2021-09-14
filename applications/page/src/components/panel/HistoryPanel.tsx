import React from 'react';
import { HistoryView } from '../history/HistoryView';
import { Pane } from '../layout/Pane';

export const HistoryPanel = () => {
  return (
    <Pane heading="Histories">
      <HistoryView />
    </Pane>
  );
};
