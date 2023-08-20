import { atom } from 'jotai';

export const isDrawing_canvasAtom = atom<boolean>(false);
export const isMoving_canvasAtom = atom<boolean>(false);
export const width_canvasAtom = atom<number>(0);
export const height_canvasAtom = atom<number>(0);
export const cursorType_canvasAtom = atom<
  'draw' | 'default' | 'move' | 'pointer' | 'drag' | 'resize'
>('default');

export const actionType_canvasAtom = atom<
  'drawing' | 'moving' | 'resizing' | 'none'
>('none');
