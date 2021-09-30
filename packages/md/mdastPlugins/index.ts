import { CreateMdastPlugin } from '../types';
import { createMdastPlugin } from './createMdastPlugin';
import { image } from './image';
import { oembed } from './oembed';
import { table } from './table';

const defaultMdastPlugins = [image, table, oembed];

export const createMdastPlugins = (hastPlugins: CreateMdastPlugin[] = []) =>
  defaultMdastPlugins.concat(hastPlugins).map(createMdastPlugin);
