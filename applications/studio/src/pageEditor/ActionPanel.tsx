import React from 'react';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Text,
} from '@chakra-ui/react';
import { Form, Ui } from '@cofe/form';
import { useDispatch } from '@cofe/store';
import { Empty } from '@cofe/ui';
import { useSchema } from '@/hooks/useSchema';
import { useSelectedNode } from '@/hooks/useSelectedNode';

export const ActionPanel = () => {
  const selectedNode = useSelectedNode();
  const dispatch = useDispatch();
  const schema = useSchema(selectedNode?.type);

  const aSchema = schema?.actions;

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
              dispatch('UPDATE_NODE')({
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
