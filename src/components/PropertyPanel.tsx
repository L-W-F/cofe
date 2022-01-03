import React from 'react';
import { Box, Button, chakra, Divider, IconButton } from '@chakra-ui/react';
import * as atoms from '@cofe/atoms';
import { Form } from '@cofe/form';
import { ChevronLeftIcon, DeleteIcon } from '@cofe/icons';
import { Confirm, Empty, Paper, PaperProps, Toolbar } from '@cofe/ui';
import { useDndState } from '@/store/dnd';
import { useSelectedNode, useTreeNodeActions } from '@/store/editor';

export const PropertyPanel = (props: PaperProps) => {
  const selectedNode = useSelectedNode();
  const { remove, update } = useTreeNodeActions();
  const { select } = useDndState();

  const schema = atoms[selectedNode?.type];

  return selectedNode ? (
    <Paper
      overflow="auto"
      borderRadius={0}
      shadow="none"
      p={2}
      display="flex"
      flexDirection="column"
      {...props}
    >
      <Toolbar px={0}>
        <IconButton
          aria-label="返回"
          icon={<ChevronLeftIcon />}
          size="sm"
          onClick={() => {
            select(null);
          }}
        />
        <chakra.span
          fontSize="md"
          fontWeight="semibold"
          textTransform="capitalize"
        >
          {selectedNode.type}
        </chakra.span>
      </Toolbar>
      <Divider />
      <Box flex={1} p={2}>
        {schema?.properties ? (
          <Form
            formData={selectedNode.properties}
            schema={schema.properties}
            uiSchema={schema.form}
            onChange={(e) => {
              update({
                ...selectedNode,
                properties: e.formData,
              });
            }}
          />
        ) : (
          <Empty />
        )}
      </Box>
      <Divider />
      <Toolbar px={0}>
        <Confirm
          onConfirm={() => {
            remove(selectedNode);
          }}
          title="删除节点"
          content="确定删除此节点吗？"
        >
          <Button
            leftIcon={<DeleteIcon />}
            colorScheme="error"
            variant="ghost"
            size="sm"
          >
            删除此节点
          </Button>
        </Confirm>
      </Toolbar>
    </Paper>
  ) : null;
};

if (process.env.NODE_ENV === 'development') {
  PropertyPanel.displayName = 'PropertyPanel';
}
