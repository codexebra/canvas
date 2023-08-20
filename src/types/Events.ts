/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction } from 'jotai';

import { Element } from '@/types/Elements';
import { ActiveTool } from '@/types/Tools';

export type EventType = string | null;

export type OnCanvasEventResp =
  | {
      type:
        | 'add_element'
        | 'remove_element'
        | 'no_action'
        | 'change_to_selection'
        | 'update_elements'
        | 'set_selected_element'
        | 'remove_selected_element'
        | 'set_cursor'
        | 'set_drawing'
        | 'set_moving'
        | 'set_action';
      options?: Record<string, any>;
    }[]
  | null;
export type OnCanvasPointerMoveResp =
  | {
      element?: Element;
      id?: Element['id'];
    }
  | null
  | undefined;

export type OnCanvasEventProps = {
  activeElement: Element;
  selectedElement: Element;
  canvas: HTMLCanvasElement | undefined | null;
  context: CanvasRenderingContext2D | undefined | null;
  setState: (args: OnCanvasEventResp) => any;
  action: 'drawing' | 'moving' | 'resizing' | 'none';
  elements: Record<Element['id'], Element>;
  event: React.PointerEvent;
  tool: ActiveTool;
  previousEvent: EventType;
};

export type OnCanvasPointerDownProps = {
  event: React.PointerEvent;
  canvas: HTMLCanvasElement | undefined | null;
  context: CanvasRenderingContext2D | undefined | null;
  drawState: [boolean, (e: SetStateAction<boolean>) => void];
  tool: ActiveTool;
  elements: Record<Element['id'], Element>;
  setCursor: (e: SetStateAction<'draw' | 'move' | 'default'>) => void;
};
export type OnCanvasPointerDownResp =
  | {
      element: Element;
      id: Element['id'];
    }
  | null
  | undefined;

export type OnCanvasPointerUpProps = {
  event: React.PointerEvent;
  canvas: HTMLCanvasElement | undefined | null;
  context: CanvasRenderingContext2D | undefined | null;
  tool: ActiveTool;
  previousEvent: string | null;
  drawState: [boolean, (e: SetStateAction<boolean>) => void];
  activeElement: Element;
  setCursor: (e: SetStateAction<'draw' | 'move' | 'default'>) => void;
};
