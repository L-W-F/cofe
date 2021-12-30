import React from 'react';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Grid,
  Text,
} from '@chakra-ui/react';
import { DragItem } from './DragItem';
import { useMoleculeValue } from '@/store/molecule';

export const MoleculePanel = () => {
  const molecules = useMoleculeValue();

  return (
    <AccordionItem>
      <AccordionButton>
        <AccordionIcon />
        <Text as="h2" whiteSpace="nowrap">
          分子模板
        </Text>
      </AccordionButton>
      <AccordionPanel>
        <Grid gridTemplateColumns="1fr 1fr" gridGap={2}>
          {molecules &&
            Object.entries(molecules).map(([type]) => {
              return <DragItem key={type} type={type} />;
            })}
        </Grid>
      </AccordionPanel>
    </AccordionItem>
  );
};

if (process.env.NODE_ENV === 'development') {
  MoleculePanel.displayName = 'MoleculePanel';
}
