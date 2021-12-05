import { useCallback, useMemo } from 'react';
import { Tree } from '@cofe/core';
import { CofeDndPayload, CofeTree } from '@cofe/types';
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import { filter } from 'unist-util-filter';
import { select } from 'unist-util-select';
import { EXIT, visit } from 'unist-util-visit';
import { useDndState } from './dnd';

export const MODE_DESIGN = 1;
export const MODE_SOURCE = 2;
export const MODE_PREVIEW = 3;

export const editorIdState = atom({
  key: 'editor.id',
  default: '',
});

export const editorModeState = atom({
  key: 'editor.mode',
  default: 1,
});

export const editorStackState = atom({
  key: 'editor.stack',
  default: [Tree.create('fragment')],
});

export const editorCursorState = atom({
  key: 'editor.cursor',
  default: 0,
});

export const useEditorId = () => useRecoilValue(editorIdState);
export const useEditorMode = () => useRecoilValue(editorModeState);

export const useSwitchMode = (payload) =>
  useSetRecoilState(editorModeState)(payload);

export const useSwitchPage = () => {
  const setStack = useSetRecoilState(editorStackState);
  const setCursor = useSetRecoilState(editorCursorState);
  const setId = useSetRecoilState(editorIdState);

  return useCallback(
    (payload) => {
      setStack([payload.tree ?? Tree.create('fragment')]);
      setCursor(0);
      setId(payload.id);
    },
    [setCursor, setId, setStack],
  );
};

export const useStackActions = () => {
  const [stack, setStack] = useRecoilState(editorStackState);
  const [cursor, setCursor] = useRecoilState(editorCursorState);

  return {
    canUndo: cursor < stack.length - 1,
    undo: useCallback(() => {
      setCursor((state) => state + 1);
    }, [setCursor]),

    canRedo: cursor > 0,
    redo: useCallback(() => {
      setCursor((state) => state - 1);
    }, [setCursor]),

    push: useCallback(
      (payload) => {
        setStack((state) => [payload].concat(state));
        setCursor(0);
      },
      [setCursor, setStack],
    ),
  };
};

export const useTreeNodeActions = () => {
  const setStack = useSetRecoilState(editorStackState);
  const [cursor, setCursor] = useRecoilState(editorCursorState);

  return {
    append: useCallback(
      (payload) => {
        setStack((stack) =>
          [appendNodeByDnd(stack[cursor], payload)].concat(stack.slice(cursor)),
        );
        setCursor(0);
      },
      [cursor, setCursor, setStack],
    ),
    update: useCallback(
      (payload) => {
        setStack((stack) =>
          [updateNode(stack[cursor], payload)].concat(stack.slice(cursor)),
        );
        setCursor(0);
      },
      [cursor, setCursor, setStack],
    ),
    remove: useCallback(
      (payload) => {
        setStack((stack) =>
          [removeNodeById(stack[cursor], payload.id)].concat(
            stack.slice(cursor),
          ),
        );
        setCursor(0);
      },
      [cursor, setCursor, setStack],
    ),
    duplicate: useCallback(
      (payload) => {
        setStack((stack) =>
          [duplicateNodeById(stack[cursor], payload.id)].concat(
            stack.slice(cursor),
          ),
        );
        setCursor(0);
      },
      [cursor, setCursor, setStack],
    ),
  };
};

const selectedTreeSelector = selector({
  key: 'selected.tree.selector',
  get: ({ get }) => {
    const stack = get(editorStackState);
    const cursor = get(editorCursorState);

    return stack[cursor] ? Tree.hydrate(stack[cursor]) : null;
  },
});

export const useSelectedTree = () => {
  return useRecoilValue(selectedTreeSelector);
};

export const useSelectedNode = () => {
  const tree = useSelectedTree();
  const { selected } = useDndState();

  return selected?.id
    ? (select(`[id=${selected.id}]`, tree as any) as CofeTree)
    : null;
};

export const useSelectedPath = () => {
  const selected = useSelectedNode();

  return useMemo(() => {
    const nodes = [];

    let current = selected;

    while (current) {
      nodes.push(current);

      current = current.parent;
    }

    return nodes;
  }, [selected]);
};

function duplicateNodeById(tree: CofeTree, id: string) {
  tree = Tree.copy(tree);

  visit(tree, { id }, (node, index, parent: any) => {
    parent.children.splice(index, 0, Tree.copy(node, true)) as [CofeTree];

    return EXIT;
  });

  return tree;
}

function removeNodeById(tree: CofeTree, id: string) {
  return (
    filter(tree, { cascade: false }, (node: any) => id !== node.id) ??
    Tree.create('fragment')
  );
}

function appendNodeByDnd(
  tree: CofeTree,
  { dragging, container, reference, adjacent }: CofeDndPayload,
) {
  tree = Tree.copy(tree);

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

  return tree;
}

function updateNode(tree: CofeTree, payload: Partial<CofeTree>) {
  tree = Tree.copy(tree);

  visit(tree, { id: payload.id }, (node, index, parent) => {
    if ('properties' in payload) {
      node.properties = { ...node.properties, ...payload.properties };
    }

    if ('actions' in payload) {
      node.actions = [...payload.actions];
    }

    return EXIT;
  });

  return tree;
}
