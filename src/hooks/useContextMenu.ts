import { useCallback, useEffect, useState } from 'react';

export const useContextMenu = () => {
  const [[isOpen, x, y], setMenuCoord] = useState<[boolean, number?, number?]>([
    false,
  ]);

  const onContextMenu = useCallback((e) => {
    e.preventDefault();
    setMenuCoord([true, e.clientX, e.clientY]);
  }, []);

  const onClose = useCallback(() => {
    setMenuCoord(([a, b, c]) => [false, b, c]);
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', onClose);

    return () => {
      document.removeEventListener('mousedown', onClose);
    };
  }, [onClose]);

  return {
    isOpen,
    onClose,
    x,
    y,
    triggerProps: {
      onContextMenu,
    },
  };
};
