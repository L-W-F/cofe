import { models } from './models';

export const Model = {
  get(type: string) {
    return models[type];
  },
};
