import { RefCallback, useEffect, useState } from 'react';
import { useDispatch } from '@cofe/store';

interface DragOptions {
  type?: string;
  id?: string;
  effectAllowed?: DataTransfer['effectAllowed'];
}

type DragReturns = [
  {
    isDragging: boolean;
  },
  RefCallback<HTMLElement>,
];

export const useDrag = ({
  type,
  id,
  effectAllowed = 'copyMove',
}: DragOptions): DragReturns => {
  const dispatch = useDispatch();
  const [isDragging, setIsDragging] = useState(false);
  const [dragHandle, setDragHandle] = useState<HTMLElement>(null);

  useEffect(() => {
    if (dragHandle) {
      const start = (e: DragEvent) => {
        e.stopPropagation();
        e.dataTransfer.effectAllowed = effectAllowed;

        dispatch('DRAGGING')({ type, id });
        setIsDragging(true);

        document.addEventListener('dragend', end);
      };

      const end = () => {
        setIsDragging(false);

        dispatch('DRAGGING')(null);
        dispatch('ADJACENT')(null);
        dispatch('REFERENCE')(null);
        dispatch('CONTAINER')(null);

        document.removeEventListener('dragend', end);
      };

      dragHandle.setAttribute('draggable', 'true');
      dragHandle.addEventListener('dragstart', start);

      return () => {
        dragHandle.removeEventListener('dragstart', start);
        dragHandle.setAttribute('draggable', 'false');
      };
    }
  }, [dispatch, dragHandle, effectAllowed, id, type]);

  return [
    {
      isDragging,
    },
    setDragHandle,
  ];
};
