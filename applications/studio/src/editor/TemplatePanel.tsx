import React from 'react';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  List,
} from '@chakra-ui/react';
import { useStore } from '@cofe/store';
import { DragItem } from './DragItem';
import { SchemaState } from '@/store/schema';

export const TemplatePanel = () => {
  const schemas = useStore<SchemaState>('schema');

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            模板
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel>
        <List as={Flex} flexDirection="column" gridGap={2}>
          {Object.keys(schemas).map((type) => {
            if (type.indexOf('template:') === -1) {
              return null;
            }

            return <DragItem key={type} type={type} />;
          })}
        </List>
      </AccordionPanel>
    </AccordionItem>
  );
};
