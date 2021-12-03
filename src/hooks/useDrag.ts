import { RefCallback, useEffect, useState } from 'react';
import { useDndState } from '@/store/dnd';

interface DragOptions {
  type?: string;
  id?: string;
  effectAllowed?: DataTransfer['effectAllowed'];
}

export const useDrag = ({
  type,
  id,
  effectAllowed = 'copyMove',
}: DragOptions): RefCallback<HTMLElement> => {
  const { reset, drag } = useDndState();
  const [dragHandle, setDragHandle] = useState<HTMLElement>(null);

  useEffect(() => {
    if (dragHandle) {
      const start = (e: DragEvent) => {
        e.stopPropagation();
        e.dataTransfer.effectAllowed = effectAllowed;

        drag({ type, id });

        document.addEventListener('dragend', end);
      };

      const end = () => {
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
  }, [dragHandle, effectAllowed, id, reset, drag, type]);

  return setDragHandle;
};
