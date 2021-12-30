import { CofeAtom } from '@cofe/types';
import { FragmentRenderer } from './renderers/Fragment';

export const fragment: CofeAtom = {
  type: 'fragment',
  accept: ['*'],
  renderer: FragmentRenderer,
};
