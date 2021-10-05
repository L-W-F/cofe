import { RefCallback, useEffect, useState } from 'react';
import { Schema } from '@cofe/core';
import { useDispatch, useStore } from '@cofe/store';
import { CofeTree } from '@cofe/types';
import { select } from 'unist-util-select';
import { useCurrentTree } from './useCurrentTree';

interface DropOptions {
  onDrop: (payload: {
    dragging: string | CofeTree;
    reference?: string;
    container?: string;
    adjacent: 'INSERT_AFTER' | 'INSERT_BEFORE';
  }) => void;
}

type DropReturns = [{}, RefCallback<HTMLElement>];

export const useDrop = ({ onDrop }: DropOptions): DropReturns => {
  const currentTree = useCurrentTree();
  const dragging = useStore('dnd.dragging');
  const dispatch = useDispatch();
  const [dropHandle, setDropHandle] = useState<HTMLElement>(null);

  useEffect(() => {
    if (dropHandle && dragging) {
      let reference: CofeTree = null;
      let container: CofeTree = null;
      let adjacent: 'INSERT_AFTER' | 'INSERT_BEFORE' = null;

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
            dragging: dragging.id ?? Schema.createNode(dragging.type),
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

            const { isInline } = Schema.get(reference.type);

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
  }, [currentTree, dispatch, dragging, dropHandle, onDrop]);

  return [{}, setDropHandle];
};

function isAccept(pType: string, cType: string) {
  const accept = Schema.get(pType)?.accept;

  if (!accept?.length) {
    return false;
  }

  return accept.some((r) => {
    if (r === '*') {
      return true;
    }

    if (r[0] === '!') {
      return r.slice(1) !== cType;
    }

    return r === cType;
  });
}

/**
 * @returns [相邻的节点?, 将要插入的父级节点?]
 */
function getAcceptChain(node: any, type: string) {
  const chain = [null, null];

  while (node) {
    chain.push({ type: node.type, id: node.id });

    if (isAccept(node.type, type)) {
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
