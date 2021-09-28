import React from 'react';
import { Flex, FlexProps, useStyleConfig } from '@chakra-ui/react';

interface ToolbarProps extends FlexProps {}

export const Toolbar = (props: ToolbarProps) => {
  const styles = useStyleConfig('Toolbar', props);

  return <Flex sx={styles} {...props} />;
};
