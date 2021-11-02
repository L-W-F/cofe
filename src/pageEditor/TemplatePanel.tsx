import React, { useEffect } from 'react';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  List,
  Text,
} from '@chakra-ui/react';
import { get } from '@cofe/io';
import { useDispatch, useStore } from '@cofe/store';
import { DragItem } from './DragItem';
import { SchemaState } from '@/store/schema';

export const TemplatePanel = () => {
  const schemas = useStore<SchemaState>('schema');
  const dispatch = useDispatch();

  useEffect(() => {
    get('/api/templates').then((v) => {
      dispatch('FETCH_SCHEMAS')(
        v.reduce((o, { type, template }) => {
          return {
            ...o,
            [`template:${type}`]: {
              type: `template:${type}`,
              template,
            },
          };
        }, {}),
      );
    });
  }, [dispatch]);

  return (
    <AccordionItem>
      <AccordionButton>
        <AccordionIcon />
        <Text as="h2">模板</Text>
      </AccordionButton>
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

if (process.env.NODE_ENV === 'development') {
  TemplatePanel.displayName = 'TemplatePanel';
}