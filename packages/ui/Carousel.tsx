import React, {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { CarouselCore, CarouselCoreProps } from './CarouselCore';

interface CarouselProps extends CarouselCoreProps {
  controlPlacement?: 'top' | 'right' | 'bottom' | 'left';
  autoplay?: boolean;
  autoplayTimeout?: number;
}

export const Carousel = ({
  controlPlacement = 'bottom',
  autoplay,
  autoplayTimeout = 3,
  duration = 0.5,
  children,
  ...props
}: CarouselProps) => {
  const [value, setValue] = useState(0);
  const childrenCount = Children.count(children);
  const hoveringRef = useRef(false);

  const dotColors = useColorModeValue(
    [
      'var(--chakra-colors-blackAlpha-300)',
      'var(--chakra-colors-blackAlpha-500)',
    ],
    [
      'var(--chakra-colors-whiteAlpha-300)',
      'var(--chakra-colors-whiteAlpha-500)',
    ],
  );

  const setValueClamped = useCallback(
    (v: number) => {
      setValue(v % childrenCount);
    },
    [childrenCount],
  );

  useEffect(() => {
    if (autoplay) {
      let timeout: any;

      const handleTimeout = () => {
        timeout = setTimeout(() => {
          if (hoveringRef.current) {
            handleTimeout();
          } else {
            setValueClamped(value + 1);
          }
        }, autoplayTimeout * 1000);
      };

      handleTimeout();

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [autoplay, autoplayTimeout, setValueClamped, value]);

  return (
    <CarouselCore
      position="relative"
      duration={duration}
      value={value}
      onMouseEnter={() => {
        hoveringRef.current = true;
      }}
      onMouseLeave={() => {
        hoveringRef.current = false;
      }}
      controls={
        <Box
          position="absolute"
          display="flex"
          flexDirection={
            ['left', 'right'].includes(controlPlacement) ? 'column' : 'row'
          }
          justifyContent="center"
          alignItems="flex-end"
          role="tablist"
          sx={
            controlPlacement === 'top'
              ? {
                  left: '50%',
                  top: 0,
                  transform: 'translate(-50%, 0)',
                  my: 2,
                }
              : controlPlacement === 'right'
              ? {
                  top: '50%',
                  right: 0,
                  transform: 'translate(0, -50%)',
                  mx: 4,
                }
              : controlPlacement === 'bottom'
              ? {
                  left: '50%',
                  bottom: 0,
                  transform: 'translate(-50%, 0)',
                  my: 2,
                }
              : {
                  top: '50%',
                  left: 0,
                  transform: 'translate(0, -50%)',
                  mx: 4,
                }
          }
        >
          {Array(childrenCount)
            .fill(0)
            .map((_, index) => (
              <Box
                key={index}
                as="i"
                role="tab"
                cursor="pointer"
                m={1}
                w={2}
                h={2}
                transition={`background-position ${duration}s ease-in-out`}
                willChange="background-position"
                bgImage={`
                  linear-gradient(45deg, ${dotColors[0]} 25%, transparent 25%, transparent 75%, ${dotColors[0]} 75%, ${dotColors[0]} 100%),
                  linear-gradient(45deg, ${dotColors[0]} 25%, ${dotColors[1]} 25%, ${dotColors[1]} 75%, ${dotColors[0]} 75%, ${dotColors[0]} 100%);
                `}
                bgSize="32px 32px"
                bgPosition={
                  index === value ? '0px 0px, 8px 8px' : '-8px 0px, 0px 8px'
                }
                borderRadius="50%"
                onClick={() => {
                  if (index !== value) {
                    setValue(index);
                  }
                }}
              />
            ))}
        </Box>
      }
      {...props}
    >
      {children}
    </CarouselCore>
  );
};
