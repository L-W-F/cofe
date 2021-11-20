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
import { DragItem } from './DragItem';
import { useTemplate } from '@/hooks/useTemplate';

export const TemplatePanel = () => {
  const { schemas } = useTemplate();

  return (
    <AccordionItem>
      <AccordionButton>
        <AccordionIcon />
        <Text as="h2">模板</Text>
      </AccordionButton>
      <AccordionPanel>
        <List as={Flex} flexDirection="column" gridGap={2}>
          {Object.entries(schemas).map(([type, schema]) => {
            return <DragItem key={type} type={type} />;
          })}
        </List>
      </AccordionPanel>
    </AccordionItem>
  );
};

if (process.env.NODE_ENV === 'development') {
  TemplatePanel.displayName = 'TemplatePanel';
}
