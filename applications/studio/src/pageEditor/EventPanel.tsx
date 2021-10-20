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

export const EventPanel = () => {
  const selectedNode = useSelectedNode();
  const dispatch = useDispatch();
  const schema = useSchema(selectedNode?.type);

  const eSchema = schema?.events;

  return (
    <AccordionItem>
      <AccordionButton>
        <AccordionIcon />
        <Text as="h2">事件</Text>
      </AccordionButton>
      <AccordionPanel>
        {eSchema ? (
          <Form
            formData={selectedNode.events}
            schema={eSchema}
            uiSchema={Ui.get(selectedNode.type)?.properties}
            idPrefix=" events"
            onChange={(e) => {
              dispatch('UPDATE_NODE')({
                ...selectedNode,
                events: e.formData,
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
  EventPanel.displayName = 'EventPanel';
}
