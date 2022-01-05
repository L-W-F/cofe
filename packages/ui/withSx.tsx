import React, { ComponentType, forwardRef } from 'react';
import { useStyleConfig } from '@chakra-ui/react';

export const withSx = <T extends any = any>(name: string, defaultProps?: Partial<T>) => (
  Component: ComponentType<T>,
) =>
  forwardRef((props: T, ref) => {
    const styles = useStyleConfig(name, props);

    return <Component ref={ref} __css={styles} {...defaultProps} {...props} />;
  });
