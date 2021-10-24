import { button } from './button';
import { fragment } from './fragment';
import { grid } from './grid';
import { icon } from './icon';
import { link } from './link';
import { mixins } from './mixins';
import { text } from './text';

export const schemas = {
  ...mixins,
  [button.type]: button,
  [fragment.type]: fragment,
  [grid.type]: grid,
  [icon.type]: icon,
  [link.type]: link,
  [text.type]: text,
};
