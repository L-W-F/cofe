import { AnyAction } from '@cofe/store';
import { CofeEditor, CofeInsertAdjacent, CofeTree } from '@cofe/types';
import { cloneDeep } from 'lodash';
import { filter } from 'unist-util-filter';
import { EXIT, visit } from 'unist-util-visit';

export interface EditorState extends CofeEditor {}

export const initialState: EditorState = {
  stack: [],
  cursor: 0,
  selected: null,
};

export const reducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case 'UNDO':
      if (state.cursor <= 0) {
        return state;
      }

      return {
        ...state,
        cursor: state.cursor - 1,
      };

    case 'REDO':
      if (state.cursor >= state.stack.length - 1) {
        return state;
      }

      return {
        ...state,
        cursor: state.cursor + 1,
      };

    case 'JUMP':
      if (state.cursor === payload) {
        return state;
      }

      return {
        ...state,
        cursor: payload,
      };

    case 'DELETE':
      return {
        ...state,
        stack: state.stack.filter((_, index) => index !== payload),
        cursor:
          payload === state.cursor
            ? Math.max(0, payload - 1)
            : payload < state.cursor
            ? state.cursor - 1
            : state.cursor,
      };

    case 'DROPPING_NODE':
      return {
        ...state,
        stack: state.stack
          .slice(0, state.cursor + 1)
          .concat(insertOrMoveNodeByDrop(state.stack[state.cursor], payload)),
        cursor: state.cursor + 1,
      };

    case 'SELECT_NODE':
      if (state.selected?.id === payload?.id) {
        return state;
      }

      return {
        ...state,
        selected: payload,
      };

    case 'DELETE_NODE':
      if (!state.selected?.id) {
        return state;
      }

      return {
        ...state,
        stack: state.stack
          .slice(0, state.cursor + 1)
          .concat(removeNodeById(state.stack[state.cursor], state.selected.id)),
        cursor: state.cursor + 1,
        selected: null,
      };

    case 'UPDATE_NODE_PROPERTIES':
      return {
        ...state,
        stack: state.stack
          .slice(0, state.cursor + 1)
          .concat(
            updateNodeProperties(
              state.stack[state.cursor],
              state.selected.id,
              payload,
            ),
          ),
        cursor: state.cursor + 1,
      };

    case 'UPDATE_NODE_ACTIONS':
      return {
        ...state,
        stack: state.stack
          .slice(0, state.cursor + 1)
          .concat(
            updateNodeActions(
              state.stack[state.cursor],
              state.selected.id,
              payload,
            ),
          ),
        cursor: state.cursor + 1,
      };

    default:
      return state;
  }
};

function assignCreatedAt(tree: CofeTree) {
  tree.createdAt = Date.now();

  return tree;
}

function removeNodeById(tree: CofeTree, nodeId: string) {
  return assignCreatedAt(
    filter(tree, { cascade: false }, ({ id }: any) => id !== nodeId),
  );
}

function insertOrMoveNodeByDrop(
  tree: CofeTree,
  {
    dragging,
    container,
    reference,
    adjacent,
  }: {
    dragging: string | CofeTree;
    container?: string;
    reference?: string;
    adjacent?: CofeInsertAdjacent;
  },
) {
  tree = cloneDeep(tree);

  let child: CofeTree;

  // 从现有树中拖动
  if (typeof dragging === 'string') {
    visit(tree, { id: dragging }, (node, index, parent: any) => {
      [child] = parent.children.splice(index, 1) as [CofeTree];

      return EXIT;
    });
  } else {
    child = dragging;
  }

  // 前插或后插
  if (adjacent && reference) {
    visit(tree, { id: reference }, (node, index, parent: any) => {
      parent.children.splice(
        adjacent === 'INSERT_BEFORE' ? index : index + 1,
        0,
        child,
      );

      return EXIT;
    });
  } else {
    visit(tree, { id: container }, (node, index, parent) => {
      if (!node.children) {
        node.children = [];
      }

      node.children = [...node.children, child];

      return EXIT;
    });
  }

  return assignCreatedAt(tree);
}

type Properties = Record<string, any>;

function updateNodeProperties(
  tree: CofeTree,
  selected: string,
  payload: Properties,
) {
  tree = cloneDeep(tree);

  visit(tree, { id: selected }, (node, index, parent) => {
    node.properties = { ...node.properties, ...payload };

    return EXIT;
  });

  return assignCreatedAt(tree);
}

type Actions = Record<string, any>;

function updateNodeActions(tree: CofeTree, selected: string, payload: Actions) {
  tree = cloneDeep(tree);

  visit(tree, { id: selected }, (node, index, parent) => {
    node.actions = { ...node.actions, ...payload };

    return EXIT;
  });

  return assignCreatedAt(tree);
}
