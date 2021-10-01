import { CreateMdastPlugin, TreeNode } from '../types';

export const image: CreateMdastPlugin = ({ visit, SKIP, u }) => {
  return function Plugin() {
    return (tree) => {
      visit<TreeNode, string>(tree, 'paragraph', (node, index, parent: any) => {
        if (node.children.length !== 1) {
          return;
        }

        let match = false;
        let [target] = node.children;

        if (target.type === 'image' || target.type === 'imageReference') {
          match = true;
        }

        if (target.type === 'link') {
          if (target.children.length !== 1) {
            return;
          }

          [target] = target.children;

          if (target.type === 'image' || target.type === 'imageReference') {
            match = true;
          }
        }

        if (match) {
          parent.children.splice(
            index,
            1,
            u('figure', { class: 'image' }, [
              u('text', '\n'),
              ...node.children,
              u('text', '\n'),
            ]),
          );

          return [SKIP, index];
        }
      });
    };
  };
};
