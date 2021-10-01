import { CreateMdastPlugin, TreeNode } from '../types';

export const table: CreateMdastPlugin = ({ visit, SKIP, u }) => {
  return function Plugin() {
    return (tree) => {
      visit<TreeNode, string>(tree, 'table', (node, index, parent: any) => {
        if (parent.type !== 'figure') {
          parent.children.splice(
            index,
            1,
            u('figure', { class: 'table' }, [
              u('text', '\n'),
              node,
              u('text', '\n'),
            ]),
          );

          return [SKIP, index];
        }
      });
    };
  };
};
