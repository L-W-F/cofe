import { ThemingProps } from '@chakra-ui/react';
import { Paper, PaperProps } from './Paper';
import { withSx } from './withSx';

export interface CardProps extends PaperProps, ThemingProps {}

export const Card = withSx<CardProps>('Card')(Paper);
