/* eslint-disable no-case-declarations */
import { RoughGenerator } from 'roughjs/bin/generator';
import rough from 'roughjs/bundled/rough.esm';

import { Elements } from '@/classes/Elements';

import { ActiveTool } from '@/types/Tools';

export class Events {
  ctx;
  canvas: HTMLCanvasElement | null;
  elementsFns: Elements;
  generator: RoughGenerator;
  constructor(canvasRef: React.MutableRefObject<HTMLCanvasElement | null>) {
    this.canvas = canvasRef.current;
    this.ctx = canvasRef?.current?.getContext('2d');
    this.elementsFns = new Elements();
    this.generator = rough.generator();
  }
  onCanvasPointerDown(e: React.PointerEvent, tool: ActiveTool) {
    switch (tool.type) {
      case 'line':
        console.log('starting line draw');
        const coord = [e.clientX, e.clientY, e.clientX, e.clientY];
        const options = {};
        const { line } = this.elementsFns.createLineElement(
          coord,
          this.generator,
          options
        );
        rough.canvas(this.canvas).draw(line);

        break;
      case 'text':
        console.log('starting text drawing');
        break;
      case 'selection':
        console.log('starting selection drawing');
        console.log(this.canvas, this.ctx);
        break;
      default:
        console.log('selection text drawing');
    }
  }
}
