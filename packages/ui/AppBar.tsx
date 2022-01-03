import { Paper, PaperProps } from './Paper';
import { withSx } from './withSx';

export interface AppBarProps extends PaperProps {}

export const AppBar = withSx<AppBarProps>('AppBar', {
  rounded: 0,
  position: 'fixed',
  zIndex: 1,
  left: 0,
  right: 0,
})(Paper);
