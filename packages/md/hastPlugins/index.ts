import { CreateHastPlugin } from '../types';
import { createHastPlugin } from './createHastPlugin';

export const createHastPlugins = (hastPlugins: CreateHastPlugin[] = []) =>
  hastPlugins.map(createHastPlugin);
