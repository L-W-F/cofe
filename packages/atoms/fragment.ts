import { FragmentRenderer } from './renderers/Fragment';

export const fragment = {
  type: 'fragment',
  accept: ['*'],
  renderer: FragmentRenderer,
};
