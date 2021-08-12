import React, { useEffect, useRef, useState } from 'react';

export interface UseSplitPaneOptions {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  initialSize?: number;
  maxSize?: number;
  minSize?: number;
  step?: number;
  onStart?: () => void;
  onEnd?: (size: number) => void;
}

export const useSplitPane = (
  {
    direction = 'row',
    initialSize = 0,
    maxSize = Number.MAX_SAFE_INTEGER,
    minSize = 0,
    step = 0,
    onStart,
    onEnd,
  }: UseSplitPaneOptions = {} as UseSplitPaneOptions,
) => {
  const resizePaneRef = useRef<HTMLDivElement>();
  const startHandleRef = useRef<boolean>(false);
  const startSizeRef = useRef<number>(initialSize);
  const startOffsetRef = useRef<number>(0);
  const latestSizeRef = useRef<number>(initialSize);

  const [size, setSize] = useState(initialSize);
  const isHorizontal = /^row/.test(direction);
  const isReversed = /reverse$/.test(direction);

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      if (startHandleRef.current) {
        const paneNode = resizePaneRef.current;

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

          latestSizeRef.current =
            startSizeRef.current - (isReversed ? -distance : distance);

          setSize(latestSizeRef.current);
        }
      }
    };

    const onMouseUp = (event: MouseEvent) => {
      if (startHandleRef.current) {
        startHandleRef.current = false;

        onEnd?.(latestSizeRef.current);
      }
    };

    document.addEventListener('mouseup', onMouseUp, true);
    document.addEventListener('mousemove', onMouseMove, true);

    return () => {
      document.removeEventListener('mouseup', onMouseUp, true);
      document.removeEventListener('mousemove', onMouseMove, true);
    };
  }, [isHorizontal, isReversed, onEnd, step]);

  return {
    paneRef: resizePaneRef,
    size: Math.max(minSize, Math.min(maxSize, size)),
    handleProps: {
      onMouseDown: (event: React.MouseEvent) => {
        onStart?.();

        startHandleRef.current = true;
        startSizeRef.current =
          resizePaneRef.current.getBoundingClientRect()[
            isHorizontal ? 'width' : 'height'
          ];
        startOffsetRef.current = isHorizontal ? event.clientX : event.clientY;
      },
    },
  };
};
