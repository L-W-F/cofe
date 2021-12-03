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
import { useSelectedNode, useTreeNodeActions } from '@/store/editor';

export const ThemePanel = () => {
  const selectedNode = useSelectedNode();
  const { update } = useTreeNodeActions();

  const pSchema = Schema.get(selectedNode?.type)?.properties;

  return (
    <AccordionItem>
      <AccordionButton>
        <AccordionIcon />
        <Text as="h2">主题</Text>
      </AccordionButton>
      <AccordionPanel>
        {pSchema ? (
          <Form
            formData={selectedNode.properties}
            schema={pSchema}
            uiSchema={Ui.get(selectedNode.type)?.properties}
            idPrefix="properties"
            onChange={(e) => {
              update({
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
  ThemePanel.displayName = 'ThemePanel';
}
