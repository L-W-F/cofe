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
import { useTemplateValue } from '@/store/template';

export const TemplatePanel = () => {
  const schemas = useTemplateValue();

  return (
    <AccordionItem>
      <AccordionButton>
        <AccordionIcon />
        <Text as="h2" whiteSpace="nowrap">模板</Text>
      </AccordionButton>
      <AccordionPanel>
        <Grid gridTemplateColumns="1fr 1fr" gridGap={2}>
          {schemas &&
            Object.entries(schemas).map(([type, schema]) => {
              return <DragItem key={type} type={type} />;
            })}
        </Grid>
      </AccordionPanel>
    </AccordionItem>
  );
};

if (process.env.NODE_ENV === 'development') {
  TemplatePanel.displayName = 'TemplatePanel';
}
