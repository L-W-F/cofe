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

export const PropertyPanel = () => {
  const selectedNode = useSelectedNode();
  const dispatch = useDispatch();
  const schema = useSchema(selectedNode?.type);

  const pSchema = schema?.properties;

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
        {pSchema ? (
          <Form
            formData={selectedNode.properties}
            schema={pSchema}
            uiSchema={Ui.get(selectedNode.type)?.properties}
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
