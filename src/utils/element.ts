import { isArray, isObject } from 'lodash';

import {
  isMouseOnElement,
  isMouseOnElementBounds,
  isMouseOnRectangleElement,
} from '@/utils/bounds';

import { Element, FrameElement } from '@/types';

export const getNonDeletedElements = (elements: readonly Element[]) =>
  elements.filter((element) => !element.isDeleted) as readonly Element[];

export const getNonDeletedFrames = (frames: readonly FrameElement[]) =>
  frames.filter((frame) => !frame.isDeleted) as readonly FrameElement[];

export const isElementOnHover = async (
  elements: Record<Element['id'], Element>,
  x: number,
  y: number
) => {
  let val = false;
  Object.values(elements).forEach((element) => {
    if (isMouseOnElement(x, y, element)) val = true;
  });
  return val;
};

export function getElementWithStackOrder(
  stackOrder: number,
  elements: Array<Element>
) {
  const element = elements.filter((value) => value.stackOrder === stackOrder);
  if (element[1]) return element[1];
  return null;
}

export function getTopStackedElement(
  elements: Array<Element> | Record<Element['id'], Element>
) {
  if (isArray(elements)) {
    return (
      elements
        .filter((element) => element.hover.active)
        .sort((a, b) => b.stackOrder - a.stackOrder)[0] ?? null
    );
  }
  if (isObject(elements)) {
    return (
      Object.values(elements)
        .filter((element) => element.hover.active)
        .sort((a, b) => b.stackOrder - a.stackOrder)[0] ?? null
    );
  }
  return null;
}

export function isMouseOverStartBoundLineElement(
  element: Element,
  mouse: Array<number>
) {
  if (element.type !== 'line') return false;
  const tl = element.x - 5;
  const tr = element.x + 5;
  const bl = element.y - 5;
  const br = element.y + 5;
  const isValid = isMouseOnRectangleElement(mouse[0], mouse[1], [
    tl,
    tr,
    bl,
    br,
  ]);
  return isValid;
}

export function isMouseOverEndBoundLineElement(
  element: Element,
  mouse: Array<number>
) {
  if (element.type !== 'line') return false;
  const tl = element.x2 - 5;
  const tr = element.x2 + 5;
  const bl = element.y2 - 5;
  const br = element.y2 + 5;
  const isValid = isMouseOnRectangleElement(mouse[0], mouse[1], [
    tl,
    tr,
    bl,
    br,
  ]);
  return isValid;
}

export function updateElementsOnHover(
  x: number,
  y: number,
  elements: Record<Element['id'], Element>
) {
  const allElementsOnHover = Object.values(elements).reduce((t, a: Element) => {
    const isMouseOverElement = isMouseOnElement(x, y, a);
    const isMouseOverElementBounds = isMouseOnElementBounds(x, y, a);
    if (isMouseOverElementBounds[0] || isMouseOverElementBounds[1]) {
      t[a.id] = {
        ...a,
        hover: { active: true },
        selection: {
          active: true,
          start: isMouseOverElementBounds[0],
          end: isMouseOverElementBounds[1],
        },
      };
    } else if (isMouseOverElement) {
      t[a.id] = { ...a, hover: { active: true }, selection: { active: false } };
      // element on hover update its bounding box on hover
    } else
      t[a.id] = {
        ...a,
        hover: { active: false },
        selection: { active: false },
      };

    return t;
  }, {} as Record<string, Element>);

  const topElement = Object.values(allElementsOnHover)
    .filter((element) => element.hover.active)
    .sort((a, b) => b.stackOrder - a.stackOrder)[0];

  const updatedElements = Object.values(elements).reduce((t, a: Element) => {
    const isMouseOverElement = isMouseOnElement(x, y, a);
    if (isMouseOverElement && topElement.id === a.id)
      t[a.id] = {
        ...a,
        hover: { active: true },
        selection: topElement.selection,
      };
    else
      t[a.id] = {
        ...a,
        hover: { active: false },
        selection: { active: false },
      };

    return t;
  }, {} as Record<string, Element>);
  return { topElement, updatedElements };
}

// export function updateElementsWithHoveredBounds(
//   x: number,
//   y: number,
//   elements: Record<Element['id'], Element>
// ) {
//   const allElementsWithBoundsOnHover = Object.values(elements).reduce(
//     (t, a: Element) => {
//       const isMouseOverElementBounds = isMouseOnElementBounds(x, y, a);
//       if (isMouseOverElementBounds[0] || isMouseOverElementBounds[1]) {
//         t[a.id] = {
//           ...a,
//           selection: {
//             active: true,
//             start: isMouseOverElementBounds[0],
//             end: isMouseOverElementBounds[1],
//           },
//         };
//       } else {
//         t[a.id] = { ...a, selection: { active: false } };
//       }
//       return t;
//     },
//     {} as Record<string, Element>
//   );

//   const topElement = Object.values(allElementsWithBoundsOnHover)
//     .filter((element) => element.selection.active)
//     .sort((a, b) => b.stackOrder - a.stackOrder)[0];

//   const updatedHoverElements = Object.values(elements).reduce(
//     (t, a: Element) => {
//       const isMouseOverElementBounds = isMouseOnElementBounds(x, y, a);
//       if (
//         isMouseOverElementBounds &&
//         (isMouseOverElementBounds[0] || isMouseOverElementBounds[1]) &&
//         topElement.id === a.id
//       )
//         t[a.id] = {
//           ...a,
//           selection: {
//             active: true,
//             start: isMouseOverElementBounds[0],
//             end: isMouseOverElementBounds[1],
//           },
//         };
//       else t[a.id] = { ...a, selection: { active: false } };

//       return t;
//     },
//     {} as Record<string, Element>
//   );
//   return { topElement, updatedHoverElements };
// }

// if (topElement.type === 'line') {
//   const isStartBoundHover =
//     Math.abs(clientX - topElement.x) <= 5 &&
//     Math.abs(clientY - topElement.y) <= 5;
//   updatedTopElement = {
//     ...topElement,
//     offsetX,
//     offsetY,
//     selection: { start: isStartBoundHover },
//   };
//   console.log(isStartBoundHover);
// }
