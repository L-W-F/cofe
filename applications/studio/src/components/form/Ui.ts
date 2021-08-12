import { uiSchemas } from './uiSchemas';

export const Ui = {
  get(type: string) {
    return uiSchemas[type];
  },
};
