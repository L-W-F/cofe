import { uiSchemas } from './uiSchemas';

export * from './Form';

export const Ui = {
  get(type: string) {
    return uiSchemas[type];
  },
};
