import { LineElement } from '@/types';
import { Point } from '@/types/Bounds';

const distance = (a: Point, b: Point) =>
  Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

export function isMouseOnElement(
  clientX: number,
  clientY: number,
  element: LineElement
) {
  if (element.type === 'line')
    return isMouseOnLineElement(clientX, clientY, element);
}

export function isMouseOnElementBounds(
  clientX: number,
  clientY: number,
  element: LineElement
) {
  if (element.type === 'line')
    return isMouseOnLineElementBounds(clientX, clientY, element);

  return [];
}

export function isMouseOnLineElement(
  clientX: number,
  clientY: number,
  element: LineElement
) {
  const { x, x2, y, y2 } = element;
  const a: Point = { x, y };
  const b: Point = { x: x2, y: y2 };
  const c: Point = { x: clientX, y: clientY };
  const offset = distance(a, b) - (distance(a, c) + distance(b, c));
  return Math.abs(offset) < 0.5;
}

export function isMouseOnLineElementBounds(
  clientX: number,
  clientY: number,
  element: LineElement
) {
  const { x, x2, y, y2 } = element;
  // start
  // x coordinate
  const lessX = x - 5;
  const moreX = x + 5;
  // y coordinate

  const lessY = y - 5;
  const moreY = y + 5;

  // end
  // x coordinate
  const lessX2 = x2 - 5;
  const moreX2 = x2 + 5;
  // y coordinate

  const lessY2 = y2 - 5;
  const moreY2 = y2 + 5;

  // console.log(Math.abs(clientX - moreX), moreX, x);
  // console.log(Math.abs(clientX - lessX), lessX, x);
  // console.log(Math.abs(clientY - moreY), moreY, y);
  // console.log(Math.abs(clientY - lessY), lessY, y);

  const isOnStartElement =
    Math.abs(clientX - moreX) <= 10 &&
    Math.abs(clientX - lessX) <= 10 &&
    Math.abs(clientY - moreY) <= 10 &&
    Math.abs(clientY - lessY) <= 10;

  const isOnEndElement =
    Math.abs(clientX - moreX2) <= 10 &&
    Math.abs(clientX - lessX2) <= 10 &&
    Math.abs(clientY - moreY2) <= 10 &&
    Math.abs(clientY - lessY2) <= 10;
  return [isOnStartElement, isOnEndElement];
}

export function isMouseOnRectangleElement(
  clientX: number,
  clientY: number,
  bounds: Array<number>
) {
  const [x, x2, y, y2] = bounds;
  const minX = Math.min(x, x2);
  const maxX = Math.max(x, x2);
  const minY = Math.min(y, y2);
  const maxY = Math.max(y, y2);
  return (
    clientX >= minX && clientX <= maxX && clientY >= minY && clientY <= maxY
  );
}

export function rotatePoint(x: number, y: number, angle: number) {
  const newX = x * Math.cos(angle) - y * Math.sin(angle);
  const newY = x * Math.sin(angle) + y * Math.cos(angle);
  return { x: newX, y: newY };
}
