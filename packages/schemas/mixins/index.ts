import { actions } from './actions';

export const mixins = {
  [actions.type]: actions,
};
