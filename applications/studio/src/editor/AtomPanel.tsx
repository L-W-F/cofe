import React from 'react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  List,
  ListIcon,
  ListItem,
  Tag,
  TagProps,
} from '@chakra-ui/react';
import { models } from '@cofe/models';
import { capitalize } from 'lodash';
import { useDrag } from '@/hooks/useDrag';

interface AtomDragProps extends TagProps {
  type: string;
}

const AtomDrag = ({
  type,
  children = capitalize(type),
  ...props
}: AtomDragProps) => {
  const [{ isDragging }, drag] = useDrag({
    type,
    effectAllowed: 'copy',
  });

  return (
    <ListItem>
      <ListIcon as={ArrowForwardIcon} />
      <Tag ref={drag} cursor="move" opacity={isDragging ? 0.5 : 1} {...props}>
        {children}
      </Tag>
    </ListItem>
  );
};

export const AtomPanel = () => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            组件
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel>
        <List as={Flex} flexDirection="column" gridGap={2}>
          {Object.keys(models).map((type) => {
            return type === 'root' ? null : <AtomDrag key={type} type={type} />;
          })}
        </List>
      </AccordionPanel>
    </AccordionItem>
  );
};
