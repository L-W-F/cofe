import React, {
  Children,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

export interface CarouselCoreProps extends Partial<Omit<BoxProps, 'onChange'>> {
  children: ReactElement | ReactElement[];
  value?: number;
  direction?: 'row' | 'column';
  duration?: number;
  controls?: ReactNode;
}

export const CarouselCore = ({
  children,
  value = 0,
  direction = 'row',
  duration = 0.5,
  controls = null,
  overflow = 'hidden',
  ...props
}: CarouselCoreProps) => {
  const [index, setIndex] = useState(0);
  const [distance, setDistance] = useState(0);
  const rootRef = useRef<HTMLDivElement>();
  const contentRef = useRef<HTMLDivElement>();

  useEffect(() => {
    setIndex(value);
  }, [value, setIndex]);

  useEffect(() => {
    if (rootRef.current) {
      const observer = new ResizeObserver(() => {
        setDistance(rootRef.current.getBoundingClientRect().width ?? 0);
      });

      observer.observe(rootRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return (
    <Box ref={rootRef} role="application" overflow={overflow} {...props}>
      <Box
        ref={contentRef}
        role="region"
        display={direction !== 'column' ? 'inline-flex' : 'block'}
        flexDirection={direction}
        transition={`transform ${duration}s ease-in-out`}
        willChange="transform"
        style={{
          transform:
            index === 0
              ? 'translate(0, 0)'
              : direction === 'row'
              ? `translate(-${distance * index}px, 0)`
              : `translate(0, -${distance * index}px)`,
        }}
      >
        {Children.map(children, (child) => (
          <Box role="banner" w={distance ?? 'initial'}>
            {child}
          </Box>
        ))}
      </Box>
      {controls}
    </Box>
  );
};
