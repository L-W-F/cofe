import { ButtonAtom } from './Button';
import { GridAtom } from './Grid';
import { IconAtom } from './Icon';
import { RootAtom } from './Root';
import { TextAtom } from './Text';

export const atoms = {
  root: RootAtom,
  grid: GridAtom,
  button: ButtonAtom,
  text: TextAtom,
  icon: IconAtom,
};

export const Atom = {
  get(type: string) {
    return atoms[type];
  },
};
