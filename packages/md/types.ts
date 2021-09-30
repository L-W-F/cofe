import { Options as ToHtmlOptions } from 'hast-util-to-html';
import { Options as FromMdOptions } from 'mdast-util-from-markdown';
import { Options as ToHastOptions } from 'mdast-util-to-hast';
import { Plugin } from 'unified';
import { u } from 'unist-builder';
import { CONTINUE, EXIT, Node, SKIP, visit } from 'unist-util-visit';

export interface TreeNode extends Node {
  properties?: Record<string, unknown>;
  children?: TreeNode[];
}

export type CreateMdastPlugin = (p: {
  visit: typeof visit;
  CONTINUE: typeof CONTINUE;
  SKIP: typeof SKIP;
  EXIT: typeof EXIT;
  u: typeof u;
}) => Plugin | [Plugin, ...unknown[]];

export type CreateHastPlugin = CreateMdastPlugin;

export interface CreateToHTMLOptions {
  fromMdOptions?: FromMdOptions;
  mdastPlugins?: CreateMdastPlugin[];
  toHastOptions?: ToHastOptions;
  hastPlugins?: CreateHastPlugin[];
  toHtmlOptions?: ToHtmlOptions;
}
