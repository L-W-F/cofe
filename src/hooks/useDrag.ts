import { RefCallback, useEffect, useState } from 'react';
import { useDispatch } from '../store';

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
      const drag = (e: DragEvent) => {
        dispatch('DRAGGING')({ type, id });
        setIsDragging(true);
      };

      const end = () => {
        setIsDragging(false);

        dispatch('DRAGGING')(null);
        dispatch('ADJACENT')(null);
        dispatch('REFERENCE')(null);
        dispatch('CONTAINER')(null);

        document.removeEventListener('drag', drag);
        document.removeEventListener('dragend', end);
      };

      const start = (e: DragEvent) => {
        e.stopPropagation();
        e.dataTransfer.effectAllowed = effectAllowed;

        document.addEventListener('drag', drag);
        document.addEventListener('dragend', end);
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
