import { u } from 'unist-builder';
import { CONTINUE, EXIT, SKIP, visit } from 'unist-util-visit';
import { CreateHastPlugin } from '../types';

export const createHastPlugin = (p: CreateHastPlugin) =>
  p({
    visit,
    CONTINUE,
    SKIP,
    EXIT,
    u,
  });
