import React, { ComponentType, forwardRef } from 'react';
import { CSSObject, useStyleConfig } from '@chakra-ui/react';

export const withSx =
  <T extends any = any>(name: string, defaultProps?: T) =>
  (Component: ComponentType<T & { sx?: CSSObject }>) =>
    forwardRef((props: T & { sx?: CSSObject }, ref) => {
      const sx = useStyleConfig(name, props);

      return <Component ref={ref} {...defaultProps} {...sx} {...props} />;
    });
