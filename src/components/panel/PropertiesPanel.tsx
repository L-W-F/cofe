import React from 'react';
import { useCurrentNode } from '../../hooks/useCurrentNode';
import { Model } from '../../Model';
import { useDispatch } from '../../store';
import { SchemaForm } from '../form/SchemaForm';
import { Ui } from '../form/Ui';
import { Pane } from '../layout/Pane';

export const PropertiesPanel = () => {
  const currentNode = useCurrentNode();
  const dispatch = useDispatch();

  if (currentNode) {
    const { type, properties } = currentNode;

    const schemaProperties = Model.get(type)?.properties;
    const uiSchema = Ui.get(type)?.schema;

    if (schemaProperties) {
      return (
        <Pane heading="Properties">
          <SchemaForm
            formData={properties}
            schema={schemaProperties}
            uiSchema={uiSchema}
            idPrefix="properties"
            onChange={(e) => {
              dispatch('UPDATE_NODE_PROPERTIES')(e.formData);
            }}
          />
        </Pane>
      );
    }
  }

  return (
    <Pane heading="Properties">
      {currentNode
        ? 'there is no properties for the node'
        : 'please select a node'}
    </Pane>
  );
};
