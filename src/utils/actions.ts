/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { v4 } from 'uuid';

import { updateElementsOnHover } from '@/utils/element';
import { convertToElement } from '@/utils/transformers';

import { Element } from '@/types';
import { OnCanvasEventProps, OnCanvasEventResp } from '@/types/Events';

export async function handleLineToolCanvasDownAction({
  setState,
  elements,
  event,
}: OnCanvasEventProps) {
  const { clientX, clientY } = event;
  setState([
    { type: 'set_cursor', options: { cursorType: 'draw' } },
    { type: 'set_action', options: { value: 'drawing' } },
  ]);
  const id = v4();
  const element = await convertToElement({
    type: 'line',
    coord: [clientX, clientY, clientX, clientY],
    options: {
      stackOrder: Object.keys(elements).length,
      hover: { active: false },
    },
    id,
  });
  return setState([{ type: 'add_element', options: { element, id } }]);
}

export async function handleSelectionToolCanvasDownAction({
  event,
  elements,
  setState,
}: OnCanvasEventProps) {
  const { clientX, clientY } = event;
  const { topElement, updatedElements } = updateElementsOnHover(
    clientX,
    clientY,
    elements
  );
  // if the top element exist set the selected element state to the topElement
  // also update the elements state
  // else set selected element state to null
  if (topElement) {
    setState([
      { type: 'set_selected_element', options: { id: topElement.id } },
    ]);
    // define offsets
    const offsetX = clientX - topElement.x;
    const offsetY = clientY - topElement.y;
    if (topElement.selection.active)
      setState([{ type: 'set_action', options: { value: 'resizing' } }]);
    else setState([{ type: 'set_action', options: { value: 'moving' } }]);
    const newElements = {
      ...updatedElements,
      [topElement.id]: { ...topElement, offsetX, offsetY },
    };
    setState([{ type: 'update_elements', options: { elements: newElements } }]);
  } else {
    setState([
      { type: 'set_selected_element', options: { id: null } },
      { type: 'update_elements', options: { elements: updatedElements } },
    ]);
  }
  return null;
}

export async function handleLineToolCanvasMoveAction({
  elements,
  activeElement,
  action,
  event,
  setState,
}: OnCanvasEventProps) {
  if (action === 'drawing') {
    const coord = [
      activeElement.x,
      activeElement.y,
      event.clientX,
      event.clientY,
    ];
    const element = await convertToElement({
      ...activeElement,
      type: 'line',
      options: {
        stackOrder: Object.keys(elements).length,
        hover: { active: false },
      },
      id: activeElement.id,
      coord,
    });

    return setState([
      { type: 'add_element', options: { element, id: activeElement.id } },
    ]);
  }
}

export async function handleSelectionToolCanvasMoveAction({
  event,
  setState,
  action,
  selectedElement,
  elements,
}: OnCanvasEventProps) {
  if (action === 'moving') {
    return handleMoveElementOnCanvasMoveAction(
      elements,
      event,
      setState,
      selectedElement
    );
  }
  if (action === 'resizing')
    return handleResizeElementOnCanvasMoveAction(
      elements,
      event,
      setState,
      selectedElement
    );
  if (action === 'none') {
    const { topElement, updatedElements } = updateElementsOnHover(
      event.clientX,
      event.clientY,
      elements
    );

    if (topElement) {
      const newElements = {
        ...updatedElements,
        [topElement.id]: { ...topElement },
      };
      setState([{ type: 'set_cursor', options: { cursorType: 'pointer' } }]);
      setState([
        { type: 'update_elements', options: { elements: newElements } },
      ]);
    } else {
      setState([{ type: 'set_cursor', options: { cursorType: 'default' } }]);
      setState([
        { type: 'update_elements', options: { elements: updatedElements } },
      ]);
    }
  }
  return null;
}
export async function handleMoveElementOnCanvasMoveAction(
  elements: Record<Element['id'], Element>,
  event: React.PointerEvent,
  setState: (args: OnCanvasEventResp) => any,
  selectedElement: Element
) {
  // move line element
  if (selectedElement.type === 'line') {
    const { x, y, x2, y2, offsetX, offsetY } = selectedElement;
    const width = x2 - x;
    const height = y2 - y;
    const newX = event.clientX - offsetX;
    const newY = event.clientY - offsetY;
    const newElement = {
      ...selectedElement,
      x: newX,
      y: newY,
      x2: newX + width,
      y2: newY + height,
    };
    setState([{ type: 'set_cursor', options: { cursorType: 'drag' } }]);
    setState([
      {
        type: 'update_elements',
        options: {
          elements: { ...elements, [newElement.id]: newElement },
        },
      },
    ]);
  }
  return null;
}

export async function handleResizeElementOnCanvasMoveAction(
  elements: Record<Element['id'], Element>,
  event: React.PointerEvent,
  setState: (args: OnCanvasEventResp) => any,
  selectedElement: Element
) {
  if (selectedElement.type === 'line') {
    const { x, y, x2, y2 } = selectedElement;
    const newElement = {
      ...selectedElement,
      x: selectedElement?.selection?.start ? event.clientX : x,
      y: selectedElement?.selection?.start ? event.clientY : y,
      x2: selectedElement?.selection?.end ? event.clientX : x2,
      y2: selectedElement?.selection?.end ? event.clientY : y2,
    };
    setState([{ type: 'set_cursor', options: { cursorType: 'resize' } }]);
    setState([
      {
        type: 'update_elements',
        options: {
          elements: { ...elements, [newElement.id]: newElement },
        },
      },
    ]);
  }
}
