import React from 'react';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
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
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            事件
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel>
        {eSchema ? (
          <Form
            formData={selectedNode.events}
            schema={eSchema}
            uiSchema={Ui.get(selectedNode.type)?.properties}
            idPrefix=" events"
            onChange={(e) => {
              dispatch('UPDATE_NODE_EVENTS')(e.formData);
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
