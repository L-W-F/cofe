import React, { useEffect, useRef } from 'react';
import { clamp } from 'lodash-es';

export interface UseSplitPaneOptions {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  initialSize?: number;
  maxSize?: number;
  minSize?: number;
  step?: number;
  onInit?: (size: number, pane: HTMLDivElement) => void;
  onStart?: (size: number, pane: HTMLDivElement) => void;
  onResize?: (size: number, pane: HTMLDivElement) => void;
  onEnd?: (size: number, pane: HTMLDivElement) => void;
}

export const useSplitPane = (
  {
    direction = 'row',
    initialSize = 0,
    maxSize = Number.MAX_SAFE_INTEGER,
    minSize = 0,
    step = 0,
    onInit,
    onStart,
    onResize,
    onEnd,
  }: UseSplitPaneOptions = {} as UseSplitPaneOptions,
) => {
  const paneRef = useRef<HTMLDivElement>();
  const isActiveRef = useRef<boolean>(false);
  const startSizeRef = useRef<number>(initialSize);
  const startOffsetRef = useRef<number>(0);
  const finalSizeRef = useRef<number>(initialSize);

  const isHorizontal = /^row/.test(direction);
  const isReversed = /reverse$/.test(direction);

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      if (isActiveRef.current) {
        const paneNode = paneRef.current;

        if (paneNode) {
          const offset = isHorizontal ? event.clientX : event.clientY;

          let distance = offset - startOffsetRef.current;

          if (step) {
            distance = Math.floor(distance / step) * step;
          }

          finalSizeRef.current = clamp(
            startSizeRef.current + (isReversed ? -distance : distance),
            minSize,
            maxSize,
          );

          onResize?.(finalSizeRef.current, paneRef.current);
        }
      }
    };

    const onMouseUp = (event: MouseEvent) => {
      if (isActiveRef.current) {
        isActiveRef.current = false;

        onEnd?.(finalSizeRef.current, paneRef.current);
      }
    };

    document.addEventListener('mouseup', onMouseUp, true);
    document.addEventListener('mousemove', onMouseMove, true);

    return () => {
      document.removeEventListener('mouseup', onMouseUp, true);
      document.removeEventListener('mousemove', onMouseMove, true);
    };
  }, [isHorizontal, isReversed, maxSize, minSize, onEnd, onResize, step]);

  useEffect(() => {
    onInit?.(clamp(initialSize, minSize, maxSize), paneRef.current);
  }, [initialSize, maxSize, minSize, onInit]);

  return {
    paneRef,
    handleProps: {
      onMouseDown: (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();

        isActiveRef.current = true;
        startSizeRef.current =
          paneRef.current.getBoundingClientRect()[
            isHorizontal ? 'width' : 'height'
          ];
        startOffsetRef.current = isHorizontal ? event.clientX : event.clientY;
        onStart?.(startSizeRef.current, paneRef.current);
      },
    },
  };
};
