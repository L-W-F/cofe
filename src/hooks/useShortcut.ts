import { useEffect } from 'react';
import { isMac, isMobile } from '@cofe/utils';

export const CHAR_COMMAND_KEY = '⌘';
export const CHAR_ALT_KEY = '⌥';
export const CHAR_SHIFT_KEY = '⇧';
export const CHAR_BACKSPACE_KEY = '⌫';
export const CHAR_ESCAPE_KEY = '␛';
export const CHAR_DELETE_KEY = '␡';

const keyCodeMap = {
  [CHAR_BACKSPACE_KEY]: 'Backspace',
  [CHAR_ESCAPE_KEY]: 'Escape',
  [CHAR_DELETE_KEY]: 'Delete',
};

export const useShortcut = (
  shortcut: string,
  callback: (e: KeyboardEvent) => void,
) => {
  useEffect(() => {
    if (isMobile) {
      return;
    }

    const keys = shortcut.split('').map((v) => keyCodeMap[v] ?? v);
    const lastKey = keys.pop().toLowerCase();
    const altKey = keys.includes(CHAR_ALT_KEY);
    const shiftKey = keys.includes(CHAR_SHIFT_KEY);
    const commandKey = keys.includes(CHAR_COMMAND_KEY);

    const keydown = (e: KeyboardEvent) => {
      if (!e.key) {
        return;
      }

      if (e.key.toLowerCase() !== lastKey) {
        return;
      }

      if (e.altKey !== altKey) {
        return;
      }

      if (e.shiftKey !== shiftKey) {
        return;
      }

      if (((!isMac && e.ctrlKey) || (isMac && e.metaKey)) !== commandKey) {
        return;
      }

      callback(e);
    };

    document.addEventListener('keydown', keydown, true);

    return () => {
      document.removeEventListener('keydown', keydown, true);
    };
  }, [callback, shortcut]);
};
