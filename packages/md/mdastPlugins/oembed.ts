import { CreateMdastPlugin, TreeNode } from '../types';

export const oembed: CreateMdastPlugin = ({ visit, SKIP, u }) => {
  return function Plugin() {
    return (tree) => {
      visit<TreeNode, string>(tree, 'paragraph', (node, index, parent: any) => {
        if (node.children.length !== 1) {
          return;
        }

        let [target] = node.children;

        if (target.type === 'link') {
          if (target.children.length !== 1) {
            return;
          }

          const { url } = target as any;

          [target] = target.children;

          if (target.type === 'text' && (target as any).value === '!oembed') {
            parent.children.splice(
              index,
              1,
              u('figure', { class: 'media' }, [
                u('text', '\n'),
                u('oembed', { url }),
                u('text', '\n'),
              ]),
            );

            return [SKIP, index];
          }
        }
      });
    };
  };
};
