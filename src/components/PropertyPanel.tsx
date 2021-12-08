import React from 'react';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Text,
} from '@chakra-ui/react';
import * as atoms from '@cofe/atoms';
import { Form } from '@cofe/form';
import { Empty } from '@cofe/ui';
import { useSelectedNode, useTreeNodeActions } from '@/store/editor';

export const PropertyPanel = () => {
  const selectedNode = useSelectedNode();
  const { update } = useTreeNodeActions();

  const schema = atoms[selectedNode?.type];
  const pSchema = schema?.properties;
  const pUiSchema = schema?.uiSchema?.properties;

  return (
    <AccordionItem>
      <AccordionButton>
        <AccordionIcon />
        <Text as="h2" whiteSpace="nowrap">
          属性
        </Text>
      </AccordionButton>
      <AccordionPanel>
        {pSchema ? (
          <Form
            formData={selectedNode.properties}
            schema={pSchema}
            uiSchema={pUiSchema}
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
  PropertyPanel.displayName = 'PropertyPanel';
}
