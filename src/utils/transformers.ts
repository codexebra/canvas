/* eslint-disable @typescript-eslint/no-explicit-any */
import { Element } from '@/types';

export const convertToElement = (options: any) => {
  return {
    ...options.options,
    type: options.type,
    id: options.id,
    x: options.coord[0],
    y: options.coord[1],
    x2: options.coord[2],
    y2: options.coord[3],
  } as Element;
};

export const updateElementObject = (
  element: Partial<Element>,
  toUpdate: Partial<Element>
) => {
  return {
    ...element,
    ...toUpdate,
  };
};
