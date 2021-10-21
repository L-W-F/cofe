import { gfmFromMarkdown } from 'mdast-util-gfm';
import { gfm } from 'micromark-extension-gfm';
import { CreateToHTMLOptions } from '../types';

const defaultExtensions = [
  gfm({
    singleTilde: true,
  }),
];

const defaultMdastExtensions = [gfmFromMarkdown()];

export const createFromMdOptions = ({
  extensions = [],
  mdastExtensions = [],
}: CreateToHTMLOptions['fromMdOptions'] = {}) => {
  return {
    extensions: defaultExtensions.concat(extensions),
    mdastExtensions: defaultMdastExtensions.concat(mdastExtensions as any),
  };
};
