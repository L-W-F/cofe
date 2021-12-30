import { CofeAtom } from '@cofe/types';
import { UnknownRenderer } from './renderers/Unknown';

export const unknown: CofeAtom = {
  type: 'unknown',
  renderer: UnknownRenderer,
};
