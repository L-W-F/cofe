import { cloneDeep } from 'lodash';
import { AnyAction } from 'redux';
import { Node } from 'unist-builder';
import { filter } from 'unist-util-filter';
import { EXIT, visit } from 'unist-util-visit';
import { CofeAtomIdentity, CofeInsertAdjacent, CofeTree } from '../../types';

export interface PageState {
  stack?: CofeTree[];
  cursor?: number;
  selected?: CofeAtomIdentity;
}

export const initialState: PageState = {
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

function removeNodeById(tree: CofeTree, nodeId: CofeAtomIdentity['id']) {
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
    dragging: CofeAtomIdentity['id'] | CofeTree;
    container?: CofeAtomIdentity['id'];
    reference?: CofeAtomIdentity['id'];
    adjacent?: CofeInsertAdjacent;
  },
) {
  tree = cloneDeep(tree);

  let child: Node;

  // 从现有树中拖动
  if (typeof dragging === 'string') {
    visit(tree, { id: dragging }, (node: CofeTree, index, parent) => {
      [child] = parent.children.splice(index, 1);

      return EXIT;
    });
  } else {
    child = dragging;
  }

  // 前插或后插
  if (adjacent && reference) {
    visit(tree, { id: reference }, (node: CofeTree, index, parent) => {
      parent.children.splice(
        adjacent === 'INSERT_BEFORE' ? index : index + 1,
        0,
        child,
      );

      return EXIT;
    });
  } else {
    visit(tree, { id: container }, (node: CofeTree, index, parent) => {
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
  selected: CofeAtomIdentity['id'],
  payload: Properties,
) {
  tree = cloneDeep(tree);

  visit(tree, { id: selected }, (node: CofeTree, index, parent) => {
    node.properties = { ...node.properties, ...payload };

    return EXIT;
  });

  return assignCreatedAt(tree);
}

type Actions = Record<string, any>;

function updateNodeActions(
  tree: CofeTree,
  selected: CofeAtomIdentity['id'],
  payload: Actions,
) {
  tree = cloneDeep(tree);

  visit(tree, { id: selected }, (node: CofeTree, index, parent) => {
    node.actions = { ...node.actions, ...payload };

    return EXIT;
  });

  return assignCreatedAt(tree);
}
