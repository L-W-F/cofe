import React from 'react';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Grid,
  Text,
} from '@chakra-ui/react';
import { Schema } from '@cofe/core';
import { DragItem } from './DragItem';

export const AtomPanel = () => {
  return (
    <AccordionItem isFocusable={false}>
      <AccordionButton>
        <AccordionIcon />
        <Text as="h2">组件</Text>
      </AccordionButton>
      <AccordionPanel>
        <Grid gridTemplateColumns="1fr 1fr" gridGap={2}>
          {Schema.getAtomKeys().map((type) => {
            return <DragItem key={type} type={type} />;
          })}
        </Grid>
      </AccordionPanel>
    </AccordionItem>
  );
};

if (process.env.NODE_ENV === 'development') {
  AtomPanel.displayName = 'AtomPanel';
}
