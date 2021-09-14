import React from 'react';
import { EntriesView } from '../entries/EntriesView';
import { Pane } from '../layout/Pane';

export const EntriesPanel = () => {
  return (
    <Pane heading="Entries">
      <EntriesView />
    </Pane>
  );
};
