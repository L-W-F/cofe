import React from 'react';
import { useCurrentNode } from '../../hooks/useCurrentNode';
import { Model } from '../../Model';
import { useDispatch } from '../../store';
import { SchemaForm } from '../form/SchemaForm';
import { Pane } from '../layout/Pane';

export const ActionsPanel = () => {
  const currentNode = useCurrentNode();
  const dispatch = useDispatch();

  if (currentNode) {
    const { type, actions } = currentNode;

    const schemaActions = Model.get(type)?.actions;

    if (schemaActions) {
      return (
        <Pane heading="Actions">
          <SchemaForm
            formData={actions}
            schema={schemaActions}
            idPrefix="actions"
            onChange={(e) => {
              dispatch('UPDATE_NODE_ACTIONS')(e.formData);
            }}
          />
        </Pane>
      );
    }
  }

  return (
    <Pane heading="Actions">
      {currentNode
        ? 'there is no actions for the node'
        : 'please select a node'}
    </Pane>
  );
};
