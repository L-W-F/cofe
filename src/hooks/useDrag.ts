import { RefCallback, useEffect, useState } from 'react';
import { useDndActions } from './useDnd';

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
  const { reset, setDragging } = useDndActions();
  const [isDragging, setIsDragging] = useState(false);
  const [dragHandle, setDragHandle] = useState<HTMLElement>(null);

  useEffect(() => {
    if (dragHandle) {
      const start = (e: DragEvent) => {
        e.stopPropagation();
        e.dataTransfer.effectAllowed = effectAllowed;

        setDragging({ type, id });
        setIsDragging(true);

        document.addEventListener('dragend', end);
      };

      const end = () => {
        setIsDragging(false);

        reset();

        document.removeEventListener('dragend', end);
      };

      dragHandle.setAttribute('draggable', 'true');
      dragHandle.addEventListener('dragstart', start);

      return () => {
        dragHandle.removeEventListener('dragstart', start);
        dragHandle.setAttribute('draggable', 'false');
      };
    }
  }, [dragHandle, effectAllowed, id, reset, setDragging, type]);

  return [
    {
      isDragging,
    },
    setDragHandle,
  ];
};
