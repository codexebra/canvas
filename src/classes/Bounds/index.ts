import { LineElement } from '@/types';
import { Point } from '@/types/Bounds';

export class Bounds {
  private distance = (a: Point, b: Point) =>
    Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
  isMouseOnLineElement(clientX: number, clientY: number, element: LineElement) {
    const { x, x2, y, y2 } = element;
    const a: Point = { x, y };
    const b: Point = { x: x2, y: y2 };
    const c: Point = { x: clientX, y: clientY };
    const offset =
      this.distance(a, b) - (this.distance(a, c) - this.distance(b, c));
    return Math.abs(offset) < 1;
  }
}
