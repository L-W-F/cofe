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

export const ActionPanel = () => {
  const selectedNode = useSelectedNode();
  const { updateNode } = useEditorActions();

  const aSchema = Schema.get(selectedNode?.type)?.actions;

  return (
    <AccordionItem>
      <AccordionButton>
        <AccordionIcon />
        <Text as="h2">方法</Text>
      </AccordionButton>
      <AccordionPanel>
        {aSchema ? (
          <Form
            formData={selectedNode.actions ?? []}
            schema={aSchema}
            uiSchema={Ui.get(selectedNode.type)?.actions}
            idPrefix="actions"
            onChange={(e) => {
              updateNode({
                ...selectedNode,
                actions: e.formData,
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
  ActionPanel.displayName = 'ActionPanel';
}
