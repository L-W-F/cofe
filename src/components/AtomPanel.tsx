import React from 'react';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  List,
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
        <List as={Flex} flexDirection="column" gridGap={2}>
          {Schema.map(([type, schema]) => {
            if (!Schema.isAtom(schema)) {
              return null;
            }

            return <DragItem key={type} type={type} />;
          })}
        </List>
      </AccordionPanel>
    </AccordionItem>
  );
};

if (process.env.NODE_ENV === 'development') {
  AtomPanel.displayName = 'AtomPanel';
}
