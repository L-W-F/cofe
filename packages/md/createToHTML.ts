import { toHtml } from 'hast-util-to-html';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { toHast } from 'mdast-util-to-hast';
import { MdastNode } from 'mdast-util-to-hast/lib';
import { unified } from 'unified';
import { createFromMdOptions } from './fromMd';
import { createHastPlugins } from './hastPlugins';
import { createMdastPlugins } from './mdastPlugins';
import { createToHastOptions } from './toHast';
import { CreateToHTMLOptions } from './types';

export function createToHTML({
  fromMdOptions,
  mdastPlugins,
  toHastOptions,
  hastPlugins,
  toHtmlOptions,
}: CreateToHTMLOptions = {}) {
  const processor = unified()
    /**
     * Markdown -> Markdown AST
     */
    .use(function parse(options) {
      this.Parser = (doc) => {
        return fromMarkdown(doc, options);
      };
    }, createFromMdOptions(fromMdOptions))
    /**
     * 操控 Markdown AST
     */
    .use(createMdastPlugins(mdastPlugins))
    /**
     * Markdown AST -> Hypertext AST
     */
    .use((options) => {
      return (tree: MdastNode) => {
        return toHast(tree, options);
      };
    }, createToHastOptions(toHastOptions))
    /**
     * 操控 Hypertext AST
     */
    .use(createHastPlugins(hastPlugins))
    /**
     * Hypertext AST -> HTML
     */
    .use(function compile(options) {
      this.Compiler = (tree) => {
        return toHtml(tree as any, options);
      };
    }, toHtmlOptions);

  return function toHTML(markdown: string) {
    return processor.processSync(markdown).toString();
  };
}
