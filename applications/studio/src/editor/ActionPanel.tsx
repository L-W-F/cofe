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

export const ActionPanel = () => {
  const selectedNode = useSelectedNode();
  const dispatch = useDispatch();
  const schema = useSchema(selectedNode?.type);

  const aSchema = schema?.actions;

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            方法
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel>
        {aSchema ? (
          <Form
            formData={selectedNode.actions}
            schema={aSchema}
            uiSchema={Ui.get(selectedNode.type)?.properties}
            idPrefix="actions"
            onChange={(e) => {
              dispatch('UPDATE_NODE_ACTIONS')(e.formData);
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
