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

export const PropertyPanel = () => {
  const selectedNode = useSelectedNode();
  const dispatch = useDispatch();

  const schema = selectedNode ? Model.get(selectedNode.type)?.properties : null;

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            属性
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel>
        {schema ? (
          <Form
            formData={selectedNode.properties}
            schema={schema}
            uiSchema={Ui.get(selectedNode.type)?.schema}
            idPrefix="properties"
            onChange={(e) => {
              dispatch('UPDATE_NODE_PROPERTIES')(e.formData);
            }}
          />
        ) : (
          <Empty />
        )}
      </AccordionPanel>
    </AccordionItem>
  );
};
