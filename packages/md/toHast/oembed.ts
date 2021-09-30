import { Handler } from 'mdast-util-to-hast';

export const oembed: Handler = (
  h,
  // type-coverage:ignore-next-line
  node,
) => {
  return h(node, 'oembed', {
    // type-coverage:ignore-next-line
    url: node.url,
  });
};
