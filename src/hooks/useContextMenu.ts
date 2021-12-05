import React, { useCallback, useEffect, useState } from 'react';

export const useContextMenu = () => {
  const [[isOpen, x, y], setMenuCoord] = useState<[boolean, number?, number?]>([
    false,
  ]);

  const onContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuCoord([true, e.clientX, e.clientY]);
  }, []);

  const onClose = useCallback(() => {
    setMenuCoord(([a, b, c]) => [false, b, c]);
  }, []);

  useEffect(() => {
    document.addEventListener('contextmenu', onClose);

    return () => {
      document.removeEventListener('contextmenu', onClose);
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
