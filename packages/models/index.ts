import { clone } from 'lodash';
import { ButtonModel } from './Button';
import { GridModel } from './Grid';
import { IconModel } from './Icon';
import { RootModel } from './Root';
import { TextModel } from './Text';

export const models = {
  root: RootModel,
  grid: GridModel,
  button: ButtonModel,
  text: TextModel,
  icon: IconModel,
};

export const Model = {
  get(type: string) {
    return models[type];
  },

  getPropertiesDefaults(type: string) {
    return extractDefaults(models[type]?.properties);
  },
};

export const extractDefaults = (
  { default: dft, type, properties = {} } = {} as any,
): any => {
  if (typeof dft !== 'undefined') {
    return clone(dft);
  }

  switch (type) {
    case 'string':
      return '';
    case 'number':
      return 0;
    case 'boolean':
      return false;
    case 'array':
      return [];
    case 'object':
      return Object.entries(properties).reduce(
        (o, [k, v]) => ({
          ...o,
          [k]: extractDefaults(v),
        }),
        {},
      );
    default:
  }
};
