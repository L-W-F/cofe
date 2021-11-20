import React from 'react';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Text,
} from '@chakra-ui/react';
import { Schema } from '@cofe/core';
import { Form, Ui } from '@cofe/form';
import { Empty } from '@cofe/ui';
import { useEditorActions } from '@/hooks/useEditor';
import { useSelectedNode } from '@/hooks/useSelectedNode';

export const PropertyPanel = () => {
  const selectedNode = useSelectedNode();
  const { updateNode } = useEditorActions();

  const pSchema = Schema.get(selectedNode?.type)?.properties;

  return (
    <AccordionItem>
      <AccordionButton>
        <AccordionIcon />
        <Text as="h2">属性</Text>
      </AccordionButton>
      <AccordionPanel>
        {pSchema ? (
          <Form
            formData={selectedNode.properties}
            schema={pSchema}
            uiSchema={Ui.get(selectedNode.type)?.properties}
            idPrefix="properties"
            onChange={(e) => {
              updateNode({
                ...selectedNode,
                properties: e.formData,
              });
            }}
          />
        ) : (
          <Empty />
        )}
      </AccordionPanel>
    </AccordionItem>
  );
};

if (process.env.NODE_ENV === 'development') {
  PropertyPanel.displayName = 'PropertyPanel';
}
