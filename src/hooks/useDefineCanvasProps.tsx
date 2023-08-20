import { useSetAtom } from 'jotai';
import React from 'react';

import { useDOMSize } from '@/hooks/useDOMSize';

import { height_canvasAtom, width_canvasAtom } from '@/store/canvas';

export const useDefineCanvasProps = (e?: HTMLElement | null) => {
  const setCanvasWidth = useSetAtom(width_canvasAtom);
  const setCanvasHeight = useSetAtom(height_canvasAtom);
  const ref: React.MutableRefObject<HTMLCanvasElement | null> =
    React.useRef(null);
  // define width and height
  const { width: canvasDOMWidth, height: canvasDOMHeight } = useDOMSize(e);
  React.useEffect(() => {
    setCanvasWidth(canvasDOMWidth ?? 0);
    setCanvasHeight(canvasDOMHeight ?? 0);
  }, [canvasDOMHeight, canvasDOMWidth, setCanvasHeight, setCanvasWidth]);

  return { ref };
};
