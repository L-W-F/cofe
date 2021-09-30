import { u } from 'unist-builder';
import { CONTINUE, EXIT, SKIP, visit } from 'unist-util-visit';
import { CreateMdastPlugin } from '../types';

export const createMdastPlugin = (p: CreateMdastPlugin) =>
  p({
    visit,
    CONTINUE,
    SKIP,
    EXIT,
    u,
  });
