import React from 'react';
import { useCurrentNode } from '../../hooks/useCurrentNode';
import { Model } from '../../Model';
import { useDispatch } from '../../store';
import { SchemaForm } from '../form/SchemaForm';
import { Pane } from '../layout/Pane';

export const EventsPanel = () => {
  const currentNode = useCurrentNode();
  const dispatch = useDispatch();

  if (currentNode) {
    const { type, events } = currentNode;

    const schemaEvents = Model.get(type)?.events;

    if (schemaEvents) {
      return (
        <Pane heading="Events">
          <SchemaForm
            formData={events}
            schema={schemaEvents}
            idPrefix="events"
            onChange={(e) => {
              dispatch('UPDATE_NODE_EVENTS')(e.formData);
            }}
          />
        </Pane>
      );
    }
  }

  return (
    <Pane heading="Events">
      {currentNode ? 'there is no events for the node' : 'please select a node'}
    </Pane>
  );
};
