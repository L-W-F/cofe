import React, { memo } from 'react';
import shallowEqual from 'shallowequal';
import { ActionsPanel } from './panel/ActionsPanel';
import { EventsPanel } from './panel/EventsPanel';
import { PropertiesPanel } from './panel/PropertiesPanel';

export const RightPane = memo(
  () => (
    <>
      <PropertiesPanel />
      <ActionsPanel />
      <EventsPanel />
    </>
  ),
  shallowEqual,
);
