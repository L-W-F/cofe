import React from 'react';
import { Link, LinkProps } from '@chakra-ui/react';
import { CofeRendererProps, CofeTreeActions } from '@cofe/types';
import { useActions } from '../hooks/useActions';

interface LinkRendererProps extends CofeRendererProps, LinkProps {
  actions?: CofeTreeActions;
}

export const LinkRenderer = ({
  isDesign,
  actions,
  ...props
}: LinkRendererProps) => {
  const actionsProps = useActions(
    isDesign || !actions?.length ? null : actions,
  );

  return (
    <Link
      _empty={
        isDesign
          ? {
              '&:before': {
                content: '"Link"',
                color: 'gray.400',
                height: '1rem',
              },
            }
          : null
      }
      {...actionsProps}
      {...props}
    />
  );
};
