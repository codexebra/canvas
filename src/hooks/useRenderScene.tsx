/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useAtomValue } from 'jotai';
import lodash from 'lodash';
import React from 'react';
import { RoughCanvas } from 'roughjs/bin/canvas';
import { RoughGenerator } from 'roughjs/bin/generator';
import rough from 'roughjs/bundled/rough.cjs';

import { selectedElement_sceneAtom } from '@/store/scene';

import { Elements } from '@/classes/Elements';

import { Element } from '@/types';
export const useRenderScene = (
  elements: Record<string, Element>,
  canvas: HTMLCanvasElement | null,
  context: CanvasRenderingContext2D | null | undefined
) => {
  const elementsFns = new Elements();
  const selectedElement = useAtomValue(selectedElement_sceneAtom);
  React.useEffect(() => {
    if ((!!elements || !lodash.isEmpty(elements)) && context && canvas) {
      // clear scene
      context?.clearRect(0, 0, canvas?.width, canvas.height);
      // render scene
      const generator: RoughGenerator = rough.generator();
      const roughCanvas: RoughCanvas = rough.canvas(canvas);
      Object.entries(elements)
        .sort((a, b) => a[1].stackOrder - b[1].stackOrder)
        .forEach(([id, element]) => {
          elementsFns.renderElement({
            element,
            generator,
            canvas: roughCanvas,
            context: canvas.getContext('2d'),
            selectedElement: elements[selectedElement || 'no_element'],
          });
        });
    }
  }, [elements, canvas, context, selectedElement]);
};
