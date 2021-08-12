import { RefCallback, useEffect, useState } from 'react';
import { u } from 'unist-builder';
import { select } from 'unist-util-select';
import { Model } from '../Model';
import { useDispatch, useStore } from '../store';
import { CofeTree } from '../types';
import { makeId } from '../utils/makeId';
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
            dragging: dragging.id ?? u(dragging.type, { id: makeId() }),
            reference: reference?.id,
            container: container?.id,
            adjacent,
          });
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

            const { isInline } = Model.get(reference.type);

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

/**
 * @returns [相邻的节点?, 将要插入的父级节点]
 */
function getAcceptChain(node: any, type: string) {
  const chain = [null, null];

  while (node) {
    chain.push({ type: node.type, id: node.id });

    if (Model.get(node.type)?.accept?.includes(type)) {
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
