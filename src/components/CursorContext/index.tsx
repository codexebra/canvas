import { useAtomValue } from 'jotai';
import React from 'react';

import clsxm from '@/lib/clxsm';

import { cursorType_canvasAtom } from '@/store/canvas';

type CursorContextType = {
  children: React.ReactNode;
};

export const CursorContext: React.FC<CursorContextType> = ({ children }) => {
  const cursorType = useAtomValue(cursorType_canvasAtom);
  return (
    <div
      className={clsxm(
        'custom-cursor-container',
        [cursorType === 'default' && 'cursor-default'],
        [cursorType === 'draw' && 'cursor-draw'],
        [cursorType === 'pointer' && 'cursor-pointer'],
        [cursorType === 'drag' && 'cursor-drag'],
        [cursorType === 'resize' && 'cursor-resize']
      )}
    >
      {children}
    </div>
  );
};
