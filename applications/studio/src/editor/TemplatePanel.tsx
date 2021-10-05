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
import { Schema } from '@cofe/core';
import { DragItem } from './DragItem';

export const TemplatePanel = () => {
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
          {Schema.keys('template').map((type) => {
            return <DragItem key={type} type={type} />;
          })}
        </List>
      </AccordionPanel>
    </AccordionItem>
  );
};
