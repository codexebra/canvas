import { Scene } from '@/classes';
import { ActionManager } from '@/classes/ActionManager';

import { Element } from '@/types/Elements';
import { Merge } from '@/types/Utils';

export type CanvasProps = Merge<
  React.ReactElement,
  {
    children: React.ReactNode;
  }
>;
export type CanvasState = {
  selectedElementIds: Readonly<{ [id: string]: true }>;
  width: number;
  height: number;
};
export type CanvasClassProperties = {
  props: CanvasProps;
  canvas: HTMLCanvasElement | null;
  focusContainer(): void;
  scene: Scene;
  actionManager: ActionManager;
  id: string;
  onInsertElements: (elements: Element[]) => void;
};
