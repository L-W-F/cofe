import { RefCallback, useEffect, useRef, useState } from 'react';
import { Schema, Tree } from '@cofe/core';
import { useDispatch, useStore } from '@cofe/store';
import { CofeDndAdjacent, CofeDndIdentity, CofeDndPayload } from '@cofe/types';
import { isEqual } from 'lodash';
import { select } from 'unist-util-select';
import { useSelectedTree } from './useSelectedTree';
import { DndState } from '@/store/dnd';
import { SchemaState } from '@/store/schema';

interface DropOptions {
  onDrop: (payload: CofeDndPayload) => void;
}

type DropReturns = [{}, RefCallback<HTMLElement>];

export const useDrop = ({ onDrop }: DropOptions): DropReturns => {
  const selectedTree = useSelectedTree();
  const schemas = useStore<SchemaState>('schema');
  const dragging = useStore<DndState['dragging']>('dnd.dragging');
  const dispatch = useDispatch();
  const [dropHandle, setDropHandle] = useState<HTMLElement>(null);
  const referenceRef = useRef<CofeDndIdentity>();
  const containerRef = useRef<CofeDndIdentity>();
  const adjacentRef = useRef<CofeDndAdjacent>();

  useEffect(() => {
    if (dropHandle && dragging) {
      let reference: CofeDndIdentity = null;
      let container: CofeDndIdentity = null;
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
            dragging:
              dragging.id ?? Tree.createNode(schemas[dragging.type], schemas),
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

            if (adjacentRef.current !== adjacent) {
              adjacentRef.current = adjacent;
              dispatch('ADJACENT')(adjacent);
            }
          } else {
            if (adjacentRef.current !== null) {
              adjacentRef.current = null;
              dispatch('ADJACENT')(null);
            }
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
            select(`[id=${e.target.dataset?.id}]`, selectedTree as any),
            dragging.type,
            schemas,
          );

          if (!isEqual(referenceRef.current, reference)) {
            referenceRef.current = reference;
            dispatch('REFERENCE')(reference);
          }

          if (!isEqual(containerRef.current, container)) {
            containerRef.current = container;
            dispatch('CONTAINER')(container);
          }
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
  }, [selectedTree, dispatch, dragging, dropHandle, onDrop, schemas]);

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
