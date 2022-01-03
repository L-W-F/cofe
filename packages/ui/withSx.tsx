import React, { ComponentType } from 'react';
import { CSSObject, useStyleConfig } from '@chakra-ui/react';

export const withSx =
  <T extends any = any>(name: string, defaultProps?: T) =>
  (Component: ComponentType<T & { sx?: CSSObject }>) =>
  (props: T & { sx?: CSSObject }) => {
    const sx = useStyleConfig(name, props);

    return <Component {...defaultProps} {...sx} {...props} />;
  };
