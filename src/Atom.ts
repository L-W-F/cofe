import { atoms } from './components/atom';

export const Atom = {
  get(type: string) {
    return atoms[type];
  },
};
