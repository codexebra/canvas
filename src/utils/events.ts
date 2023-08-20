/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-case-declarations */

import {
  handleLineToolCanvasDownAction,
  handleLineToolCanvasMoveAction,
  handleSelectionToolCanvasDownAction,
  handleSelectionToolCanvasMoveAction,
} from '@/utils/actions';

import { OnCanvasEventProps, OnCanvasEventResp } from '@/types/Events';

export async function onCanvasPointerDown({
  ...args
}: OnCanvasEventProps): Promise<OnCanvasEventResp | any> {
  const { canvas, context, tool } = args;
  if (!canvas || !context) return null;

  if (tool.type === 'line') return handleLineToolCanvasDownAction({ ...args });
  if (tool.type === 'selection')
    return handleSelectionToolCanvasDownAction({ ...args });
}

export async function onCanvasPointerMove({
  ...args
}: OnCanvasEventProps): Promise<OnCanvasEventResp | any> {
  const { canvas, context, tool } = args;
  if (!canvas || !context) return null;
  if (tool.type === 'line') {
    return handleLineToolCanvasMoveAction({ ...args });
  }
  if (tool.type === 'selection') {
    return handleSelectionToolCanvasMoveAction({ ...args });
  }
}

export async function onCanvasPointerUp({
  ...args
}: OnCanvasEventProps): Promise<OnCanvasEventResp> {
  const {
    setState,
    canvas,
    context,
    tool,
    previousEvent,
    activeElement,
    action,
  } = args;
  if (!canvas || !context) return [{ type: 'no_action' }];
  if (tool.type === 'line') {
    if (action === 'drawing') {
      setState([
        { type: 'set_cursor', options: { cursorType: 'default' } },
        { type: 'set_action', options: { value: 'none' } },
      ]);
      if (previousEvent !== 'pointermove') {
        return setState([
          {
            type: 'remove_element',
            options: { element: activeElement, id: activeElement.id },
          },
        ]);
      }
      return setState([
        { type: 'change_to_selection' },
        { type: 'set_selected_element', options: { id: activeElement.id } },
      ]);
    }
  }
  if (tool.type === 'selection') {
    setState([{ type: 'set_action', options: { value: 'none' } }]);
  }
  return null;
}
