import { RoughCanvas } from 'roughjs/bin/canvas';
import { RoughGenerator } from 'roughjs/bin/generator';
import { Point } from 'roughjs/bin/geometry';
import { v4 as uuidv4 } from 'uuid';

import { Element } from '@/types';

interface RenderElementProps {
  context: CanvasRenderingContext2D | null;
  element: Element;
  generator: RoughGenerator;
  canvas: RoughCanvas;
  selectedElement: Element | null;
}
export class Elements {
  public calculateLineAngle(x1: number, y1: number, x2: number, y2: number) {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    const angleInRadians = Math.atan2(deltaY, deltaX);
    const angleInDegrees = (angleInRadians * 180) / Math.PI;

    const normalizedAngle =
      angleInDegrees >= 0 ? angleInDegrees : 360 + angleInDegrees;
    return normalizedAngle;
  }

  public createLineElement(
    coord: Array<number>,
    generator: RoughGenerator,
    options: any
  ) {
    const id = uuidv4();
    const line = generator.line(coord[0], coord[1], coord[2], coord[3], {
      roughness: 0,
      strokeWidth: 1,
      stroke: options.hover
        ? '#47c76b'
        : options.selected
        ? '#47c76b'
        : '#000000',
      // stroke: options.hover.active ? 'blue' : 'black',
    });
    return { coord, line, options, id };
  }

  rotatePoint(x: number, y: number, angle: number, center: Array<number>) {
    const newX =
      (x - center[0]) * Math.cos(angle) -
      (y - center[1]) * Math.sin(angle) +
      center[0];
    const newY =
      (x - center[0]) * Math.sin(angle) +
      (y - center[1]) * Math.cos(angle) +
      center[1];
    return [newX, newY];
  }

  getRotatedPoints(
    tL: Array<number>,
    tR: Array<number>,
    bL: Array<number>,
    bR: Array<number>,
    angle: number,
    center: Array<number>
  ) {
    const rTL = this.rotatePoint(tL[0], tL[1], angle, center);
    const rTR = this.rotatePoint(tR[0], tR[1], angle, center);
    const bTR = this.rotatePoint(bR[0], bR[1], angle, center);
    const bTL = this.rotatePoint(bL[0], bL[1], angle, center);
    return [rTL, rTR, bTR, bTL] as Point[];
  }
  createLineEndBound(
    element: Element,
    generator: RoughGenerator,
    selectedElement: Element | null
  ) {
    const endCircle = generator.circle(element.x2, element.y2, 10, {
      roughness: 0,
      fillStyle: 'solid',
      strokeWidth: selectedElement && selectedElement?.selection?.end ? 3 : 1,
      fill: 'white',
      stroke:
        selectedElement && selectedElement.id === element.id
          ? '#47c76b'
          : 'none',
    });
    return endCircle;
  }
  createLineStartBound(
    element: Element,
    generator: RoughGenerator,
    selectedElement: Element | null
  ) {
    const startCircle = generator.circle(element.x, element.y, 10, {
      roughness: 0,
      strokeWidth:
        selectedElement &&
        selectedElement.id === element.id &&
        selectedElement?.selection?.start
          ? 4
          : 1,
      fillStyle: 'solid',
      fill: 'white',
      stroke:
        selectedElement && selectedElement.id === element.id
          ? '#47c76b'
          : 'none',
    });
    return startCircle;
  }

  public renderElement({
    element,
    generator,
    canvas,
    context,
    selectedElement,
  }: RenderElementProps) {
    const { type } = element;
    if (type === 'line') {
      this.renderLineElement({
        element,
        generator,
        canvas,
        context,
        selectedElement,
      });
      this.renderLineBoundingBox({
        element,
        generator,
        canvas,
        context,
        selectedElement,
      });
    }
  }
  private renderLineElement({
    element,
    generator,
    canvas,
    selectedElement,
  }: RenderElementProps) {
    const { line } = this.createLineElement(
      [element.x, element.y, element.x2, element.y2],
      generator,
      {
        hover: element.hover.active,
        selected: element.id === selectedElement?.id,
      }
    );
    canvas.draw(line);
  }
  private renderLineBoundingBox({
    element,
    generator,
    canvas,
    selectedElement,
  }: RenderElementProps) {
    const startCircle = this.createLineStartBound(
      element,
      generator,
      selectedElement
    );

    const endCircle = this.createLineEndBound(
      element,
      generator,
      selectedElement
    );

    canvas.draw(startCircle);
    canvas.draw(endCircle);
  }
  public getElementWithStackOrder(
    stackOrder: number,
    elements: Record<Element['id'], Element>
  ) {
    const element = Object.values(elements).filter(
      (value) => value.stackOrder === stackOrder
    );
    if (element[1]) return element[1];
    return null;
  }
}

// const width = 10;
// const height = width;
// const center = [element.x + width / 2, element.y + height / 2];
// const topLeft = [element.x, element.y];
// const topRight = [element.x + width, element.y];
// const bottomLeft = [element.x, element.y + height];
// const bottomRight = [element.x + width, element.y + height];

// const angle = this.calculateLineAngle(
//   element.x,
//   element.y,
//   element.x2,
//   element.y2
// );
// const radians = (angle * Math.PI) / 180;
// const rotatedPoints = this.getRotatedPoints(
//   topLeft,
//   topRight,
//   bottomLeft,
//   bottomRight,
//   radians,
//   center
// );
