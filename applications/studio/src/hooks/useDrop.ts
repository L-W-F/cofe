import { RefCallback, useEffect, useState } from 'react';
import { Schema } from '@cofe/core';
import { useDispatch, useStore } from '@cofe/store';
import {
  CofeDndAdjacent,
  CofeDndPayload,
  CofeTreeNodeIdentity,
} from '@cofe/types';
import { select } from 'unist-util-select';
import { useCurrentTree } from './useCurrentTree';

interface DropOptions {
  onDrop: (payload: CofeDndPayload) => void;
}

type DropReturns = [{}, RefCallback<HTMLElement>];

export const useDrop = ({ onDrop }: DropOptions): DropReturns => {
  const currentTree = useCurrentTree();
  const schemas = useStore('schema');
  const dragging = useStore('dnd.dragging');
  const dispatch = useDispatch();
  const [dropHandle, setDropHandle] = useState<HTMLElement>(null);

  useEffect(() => {
    if (dropHandle && dragging) {
      let reference: CofeTreeNodeIdentity = null;
      let container: CofeTreeNodeIdentity = null;
      let adjacent: CofeDndAdjacent = null;

      const drop = (e: DragEvent & { target: HTMLElement }) => {
        e.preventDefault();
        e.stopPropagation();

        removeListeners();

        if (container) {
          if (dragging.id) {
            if (
              dragging.id === reference?.id ||
              dragging.id === container?.id
            ) {
              return;
            }
          }

          onDrop({
            dragging: dragging.id ?? Schema.createNode(schemas[dragging.type]),
            reference: reference?.id,
            container: container?.id,
            adjacent,
          });

          dispatch('RESET_DND')(null);
        }
      };

      const over = (e: DragEvent & { target: HTMLElement }) => {
        e.preventDefault();
        e.stopPropagation();

        if (container) {
          e.dataTransfer.dropEffect = dragging?.id ? 'move' : 'copy';

          if (reference) {
            const { x, y, width, height } = document
              .querySelector(`[data-id=${reference.id}]`)
              .getBoundingClientRect();

            const { isInline } = schemas[reference.type];

            adjacent = (
              isInline ? e.clientX > x + width / 2 : e.clientY > y + height / 2
            )
              ? 'INSERT_AFTER'
              : 'INSERT_BEFORE';

            dispatch('ADJACENT')(adjacent);
          } else {
            dispatch('ADJACENT')(null);
          }
        } else {
          e.dataTransfer.dropEffect = 'none';
        }
      };

      const enter = (e: DragEvent & { target: HTMLElement }) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.target.dataset?.type) {
          [reference, container] = getAcceptChain(
            select(`[id=${e.target.dataset?.id}]`, currentTree),
            dragging.type,
            schemas,
          );

          dispatch('REFERENCE')(reference);
          dispatch('CONTAINER')(container);
        }
      };

      const leave = (e: DragEvent & { target: HTMLElement }) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.target.dataset?.type) {
        }
      };

      dropHandle.addEventListener('drop', drop);
      dropHandle.addEventListener('dragover', over);
      dropHandle.addEventListener('dragenter', enter);
      dropHandle.addEventListener('dragleave', leave);

      const removeListeners = () => {
        dropHandle.removeEventListener('drop', drop);
        dropHandle.removeEventListener('dragover', over);
        dropHandle.removeEventListener('dragenter', enter);
        dropHandle.removeEventListener('dragleave', leave);
      };

      return removeListeners;
    }
  }, [currentTree, dispatch, dragging, dropHandle, onDrop, schemas]);

  return [{}, setDropHandle];
};

/**
 * @returns [相邻的节点?, 将要插入的父级节点?]
 */
function getAcceptChain(node: any, type: string, map: any) {
  const chain = [null, null];

  while (node) {
    chain.push({ type: node.type, id: node.id });

    if (Schema.isAccepted(map[node.type].accept, type)) {
      return chain.slice(-2) as [
        {
          type: string;
          id: string;
        },
        {
          type: string;
          id: string;
        },
      ];
    }

    node = node.parent;
  }

  return chain.slice(0, 2) as [null, null];
}
