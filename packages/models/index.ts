import { ButtonModel } from './Button';
import { GridModel } from './Grid';
import { RootModel } from './Root';
import { TextModel } from './Text';

export const models = {
  root: RootModel,
  grid: GridModel,
  button: ButtonModel,
  text: TextModel,
};

export const Model = {
  get(type: string) {
    return models[type];
  },
};
