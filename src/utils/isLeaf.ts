import { LEAF_TYPES } from '../constants';

export const isLeaf = (type: string) => LEAF_TYPES.includes(type);
