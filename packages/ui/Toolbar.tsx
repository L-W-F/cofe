import React from 'react';
import {
  Flex,
  FlexProps,
  ThemingProps,
  useStyleConfig,
} from '@chakra-ui/react';

export interface ToolbarProps extends FlexProps, ThemingProps {}

export const Toolbar = (props: ToolbarProps) => {
  const styles = useStyleConfig('Toolbar', props);

  return <Flex sx={styles} {...props} />;
};
