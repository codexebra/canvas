import { Element } from '@/types';
import { CanvasState } from '@/types/Canvas';

export const getSelectedElements = (
  elements: readonly Element[],
  appState: Pick<CanvasState, 'selectedElementIds'>,
  opts?: {
    includeBoundTextElement?: boolean;
    includeElementsInFrames?: boolean;
  }
) => {
  const selectedElements = elements.filter((element) => {
    if (appState.selectedElementIds[element.id]) {
      return element;
    }
    if (
      opts?.includeBoundTextElement &&
      // isBoundToContainer(element) &&
      element?.containerId &&
      appState.selectedElementIds[element?.containerId]
    ) {
      return element;
    }
    return null;
  });

  if (opts?.includeElementsInFrames) {
    const elementsToInclude: Element[] = [];
    selectedElements.forEach((element) => {
      if (element.type === 'frame') {
        const frameElements = elements.filter(
          (element) => element.frameId === element.id
        );
        frameElements.forEach((e) => elementsToInclude.push(e));
      }
      elementsToInclude.push(element);
    });

    return elementsToInclude;
  }

  return selectedElements;
};
