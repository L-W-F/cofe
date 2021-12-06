import React from 'react';
import { Paper, PaperProps } from './Paper';
import { withSx } from './withSx';

export interface AppBarProps extends PaperProps {}

export const AppBar = withSx<AppBarProps>('AppBar')(
  ({ rounded = 0, ...props }: AppBarProps) => (
    <Paper rounded={rounded} {...props} />
  ),
);
