import { useEffect } from 'react';
import { debug } from '@cofe/logger';
import { set } from 'idb-keyval';
import { useRecoilSnapshot } from 'recoil';

export const StateObserver = () => {
  const snapshot = useRecoilSnapshot();

  useEffect(() => {
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      debug('atom')('[%s] %O', node.key, snapshot.getLoadable(node));

      if (node.key === 'app' || node.key === 'template') {
        set(node.key, snapshot.getLoadable(node).contents);
        debug('db')('[%s] ⏬', node.key);
      }
    }
  }, [snapshot]);

  return null;
};
