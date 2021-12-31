import React from 'react';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Grid,
  Text,
} from '@chakra-ui/react';
import * as atoms from '@cofe/atoms';
import { DragItem } from './DragItem';

export const AtomPanel = () => {
  return (
    <AccordionItem isFocusable={false}>
      <AccordionButton>
        <AccordionIcon />
        <Text as="h2" whiteSpace="nowrap">
          组件
        </Text>
      </AccordionButton>
      <AccordionPanel>
        <Grid gridTemplateColumns="1fr 1fr" gridGap={2}>
          {Object.values(atoms).map(({ type, icon }) => {
            return type === 'unknown' ? null : (
              <DragItem key={type} type={type} icon={icon} />
            );
          })}
        </Grid>
      </AccordionPanel>
    </AccordionItem>
  );
};

if (process.env.NODE_ENV === 'development') {
  AtomPanel.displayName = 'AtomPanel';
}
