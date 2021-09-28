import React from 'react';
import { Paper, PaperProps } from './Paper';

export interface AppBarProps extends PaperProps {}

export const AppBar = ({ rounded = 0, ...props }: AppBarProps) => (
  <Paper rounded={rounded} {...props} />
);
