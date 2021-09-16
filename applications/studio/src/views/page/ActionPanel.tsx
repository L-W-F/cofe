import React from 'react';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';
import { Model } from '@cofe/models';
import { useDispatch } from '@cofe/store';
import { Empty } from '@cofe/ui';
import { SchemaForm } from 'components/form/SchemaForm';
import { Ui } from 'components/form/Ui';
import { useSelectedNode } from 'hooks/useSelectedNode';

export const ActionPanel = () => {
  const selectedNode = useSelectedNode();
  const dispatch = useDispatch();

  const schema = selectedNode ? Model.get(selectedNode.type)?.actions : null;

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
        {schema ? (
          <SchemaForm
            formData={selectedNode.actions}
            schema={schema}
            uiSchema={Ui.get(selectedNode.type)?.schema}
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
