import { all, Handler } from 'mdast-util-to-hast';

export const figure: Handler = (
  h,
  // type-coverage:ignore-next-line
  node: any,
) => {
  return h(
    node,
    'figure',
    {
      // type-coverage:ignore-next-line
      class: node.class,
    },
    all(h, node),
  );
};
