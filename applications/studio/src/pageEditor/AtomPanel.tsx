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
import { useStore } from '@cofe/store';
import { DragItem } from './DragItem';
import { SchemaState } from '@/store/schema';

export const AtomPanel = () => {
  const schemas = useStore<SchemaState>('schema');

  return (
    <AccordionItem isFocusable={false}>
      <AccordionButton>
        <AccordionIcon />
        <Text as="h2">组件</Text>
      </AccordionButton>
      <AccordionPanel>
        <List as={Flex} flexDirection="column" gridGap={2}>
          {Object.keys(schemas).map((type) => {
            if (type.indexOf(':') !== -1) {
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
