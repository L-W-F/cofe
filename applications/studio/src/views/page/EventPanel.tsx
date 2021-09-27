import React from 'react';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';
import { Form, Ui } from '@cofe/form';
import { Model } from '@cofe/models';
import { useDispatch } from '@cofe/store';
import { Empty } from '@cofe/ui';
import { useSelectedNode } from '@/hooks/useSelectedNode';

export const EventPanel = () => {
  const selectedNode = useSelectedNode();
  const dispatch = useDispatch();
  const schema = selectedNode ? Model.get(selectedNode.type)?.events : null;

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
        {schema ? (
          <Form
            formData={selectedNode.events}
            schema={schema}
            uiSchema={Ui.get(selectedNode.type)?.schema}
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
