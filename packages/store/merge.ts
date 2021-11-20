import { mergeWith } from 'lodash-es';
import { StoreStates } from './createStore';

export const merge = (v1: StoreStates, v2: StoreStates) =>
  mergeWith({}, v1, v2, (objValue: any, srcValue: any) => {
    if (Array.isArray(objValue)) {
      return srcValue;
    }
  });
