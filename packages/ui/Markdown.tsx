import { Box, BoxProps } from '@chakra-ui/react';
import { withSx } from './withSx';

export interface MarkdownProps extends BoxProps {
  colorScheme?: string;
}

export const Markdown = withSx<MarkdownProps>('Markdown')(
  ({ colorScheme, ...props }) => <Box {...props} />,
);
