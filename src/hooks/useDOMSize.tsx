import { useEffect, useState } from 'react';
import { useEventListener, useIsomorphicLayoutEffect } from 'usehooks-ts';

export function useDOMSize(container?: HTMLElement | null) {
  const [windowSize, setWindowSize] = useState({
    width: container?.offsetWidth,
    height: container?.offsetHeight,
  });
  const handleSize = () => {
    setWindowSize({
      width: container?.offsetWidth ?? 0,
      height: container?.offsetHeight ?? 0,
    });
  };
  useEventListener('resize', handleSize);

  useEffect(() => {
    handleSize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [container]);

  useIsomorphicLayoutEffect(() => {
    handleSize();
  }, [container]);
  return windowSize;
}
