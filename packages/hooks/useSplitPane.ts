import React, { useEffect, useRef } from 'react';
import { clamp } from 'lodash';

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
          let distance =
            startOffsetRef.current -
            (isHorizontal ? event.clientX : event.clientY);

          if (step) {
            if (Math.abs(distance) < step) {
              return;
            }

            distance = Math.floor(distance / step) * step;
          }

          finalSizeRef.current =
            startSizeRef.current - (isReversed ? -distance : distance);

          onResize?.(
            clamp(finalSizeRef.current, minSize, maxSize),
            paneRef.current,
          );
        }
      }
    };

    const onMouseUp = (event: MouseEvent) => {
      if (isActiveRef.current) {
        isActiveRef.current = false;

        onEnd?.(clamp(finalSizeRef.current, minSize, maxSize), paneRef.current);
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
    onInit?.(startSizeRef.current, paneRef.current);
  }, [onInit]);

  return {
    paneRef,
    // size: clamp(size, minSize, maxSize),
    handleProps: {
      onMouseDown: (event: React.MouseEvent) => {
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
