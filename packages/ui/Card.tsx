import React from 'react';
import { ThemingProps, useStyleConfig } from '@chakra-ui/react';
import { Paper, PaperProps } from './Paper';

export interface CardProps extends PaperProps, ThemingProps {}

export const Card = ({ sx, ...props }: CardProps) => {
  const styles = useStyleConfig('Card', props);

  return <Paper sx={{ ...sx, ...styles }} {...props} />;
};
