/* eslint-disable @typescript-eslint/no-explicit-any */
// import {
//   ExcalidrawElement,
//   NonDeletedExcalidrawElement,
//   NonDeleted,
//   ExcalidrawFrameElement,
// } from "../element/types";
// import {
//   getNonDeletedElements,
//   getNonDeletedFrames,
//   isNonDeletedElement,
// } from "../element";
// import { LinearElementEditor } from "../element/linearElementEditor";
// import { isFrameElement } from "../element/typeChecks";
// import { getSelectedElements } from "./selection";
// import { AppState } from "../types";
// import { Assert, SameType } from "../utility-types";

// import { getSelectedElements } from '@/classes/Scene/selection';
// import { getNonDeletedElements, getNonDeletedFrames } from '@/utils/element';

// import { CanvasState } from '@/types/Canvas';
import { Element } from '@/types/Elements';
import { Listeners, ListenersIds } from '@/types/Scene';

// type ElementIdKey = InstanceType<typeof LinearElementEditor>["elementId"];
// type ElementKey = ExcalidrawElement | ElementIdKey;

// type SceneStateCallback = () => void;
// type SceneStateCallbackRemover = () => void;

// type SelectionHash = string & { __brand: 'selectionHash' };

// const hashSelectionOpts = (
//   opts: Parameters<InstanceType<typeof Scene>['getSelectedElements']>[0]
// ) => {
//   const keys = ['includeBoundTextElement', 'includeElementsInFrames'] as const;

//   let hash = '';
//   for (const key of keys) {
//     hash += `${key}:${opts[key] ? '1' : '0'}`;
//   }
//   return hash as SelectionHash;
// };

const isIdKey = (elementKey: any): any => {
  if (typeof elementKey === 'string') return true;
  return false;
};

class Scene {
  private static sceneMapByElement = new WeakMap<Element, Scene>();
  private static sceneMapById = new Map<string, Scene>();

  public displayName = 'Scene';
  listeners: Listeners = {
    callback: [],
    elements: [],
  };

  // private selectedElementsCache: {
  //   selectedElementIds: CanvasState['selectedElementIds'] | null;
  //   elements: readonly Element[] | null;
  //   cache: Map<SelectionHash, Element[]>;
  // } = {
  //   selectedElementIds: null,
  //   elements: null,
  //   cache: new Map(),
  // };

  addListener(listener: any, type: ListenersIds) {
    this.listeners[type] = [...this.listeners[type], listener];
  }
  callListeners(rnValue: any, type: ListenersIds) {
    this.listeners[type].forEach((listener) => {
      listener(rnValue);
    });
  }
  testArray: Array<string | number> = [];

  setTestArray(newArray: Array<string | number>) {
    this.testArray = [...this.testArray, ...newArray];
    this.callListeners(this.testArray, 'callback');
  }

  static mapElementToScene(elementKey: any, scene: Scene) {
    if (isIdKey(elementKey)) this.sceneMapById.set(elementKey, scene);
    else {
      this.sceneMapByElement.set(elementKey, scene);
      this.sceneMapById.set(elementKey.id, scene);
    }
  }

  static getScene(elementKey: any): Scene | null {
    if (isIdKey(elementKey)) return this.sceneMapById.get(elementKey) || null;
    return this.sceneMapByElement.get(elementKey) || null;
  }

  // getElementsIncludingDeleted() {
  //   return this.elements;
  // }

  // getNonDeletedElements(): readonly Element[] {
  //   return this.nonDeletedElements;
  // }

  // getFramesIncludingDeleted() {
  //   return this.frames;
  // }

  // getSelectedElements(opts: {
  //   selectedElementIds: CanvasState['selectedElementIds'];
  //   elements?: readonly Element[];
  //   includeBoundTextElement?: boolean;
  //   includeElementsInFrames?: boolean;
  // }): Element[] {
  //   const hash = hashSelectionOpts(opts);

  //   const elements = opts?.elements || this.nonDeletedElements;
  //   if (
  //     this.selectedElementsCache.elements === elements &&
  //     this.selectedElementsCache.selectedElementIds === opts.selectedElementIds
  //   ) {
  //     const cached = this.selectedElementsCache.cache.get(hash);
  //     if (cached) {
  //       return cached;
  //     }
  //   } else if (opts?.elements == null) {
  //     // if we're operating on latest scene elements and the cache is not
  //     //  storing the latest elements, clear the cache
  //     this.selectedElementsCache.cache.clear();
  //   }

  //   const selectedElements = getSelectedElements(
  //     elements,
  //     { selectedElementIds: opts.selectedElementIds },
  //     opts
  //   );

  //   // cache only if we're not using custom elements
  //   if (opts?.elements == null) {
  //     this.selectedElementsCache.selectedElementIds = opts.selectedElementIds;
  //     this.selectedElementsCache.elements = this.nonDeletedElements;
  //     this.selectedElementsCache.cache.set(hash, selectedElements);
  //   }

  //   return selectedElements;
  // }
  // getNonDeletedFrames(): readonly FrameElement[] {
  //   return this.nonDeletedFrames;
  // }

  // getElement<T extends Element>(id: T['id']): T | null {
  //   return (this.elementsMap.get(id) as T | undefined) || null;
  // }

  // getNonDeletedElement(id: Element['id']): Element | null {
  //   const element = this.getElement(id);
  //   if (element && !element.isDeleted) {
  //     return element;
  //   }
  //   return null;
  // }

  // mapElements(iteratee: (element: Element) => Element): boolean {
  //   let didChange = false;
  //   const newElements = this.elements.map((element) => {
  //     const nextElement = iteratee(element);
  //     if (nextElement !== element) {
  //       didChange = true;
  //     }
  //     return nextElement;
  //   });
  //   if (didChange) {
  //     this.replaceAllElements(newElements);
  //   }
  //   return didChange;
  // }

  // replaceAllElements(nextElements: readonly Element[]) {
  //   this.elements = nextElements;
  //   const nextFrames: FrameElement[] = [];
  //   this.elementsMap.clear();
  //   nextElements.forEach((element) => {
  //     if (element.type === 'frame') {
  //       nextFrames.push(element);
  //     }
  //     this.elementsMap.set(element.id, element);
  //     Scene.mapElementToScene(element, this);
  //   });
  //   this.nonDeletedElements = getNonDeletedElements(this.elements);
  //   this.frames = nextFrames;
  //   this.nonDeletedFrames = getNonDeletedFrames(this.frames);
  //   this.informMutation();
  // }

  // informMutation() {
  //   for (const callback of Array.from(this.callbacks)) {
  //     callback();
  //   }
  // }
  // addCallback(cb: SceneStateCallback): SceneStateCallbackRemover {
  //   if (this.callbacks.has(cb)) {
  //     throw new Error();
  //   }

  //   this.callbacks.add(cb);

  //   return () => {
  //     if (!this.callbacks.has(cb)) {
  //       throw new Error();
  //     }
  //     this.callbacks.delete(cb);
  //   };
  // }

  // destroy() {
  //   this.nonDeletedElements = [];
  //   this.elements = [];
  //   this.nonDeletedFrames = [];
  //   this.frames = [];
  //   this.elementsMap.clear();
  //   this.selectedElementsCache.selectedElementIds = null;
  //   this.selectedElementsCache.elements = null;
  //   this.selectedElementsCache.cache.clear();

  //   Scene.sceneMapById.forEach((scene, elementKey) => {
  //     if (scene === this) {
  //       Scene.sceneMapById.delete(elementKey);
  //     }
  //   });

  //   // done not for memory leaks, but to guard against possible late fires
  //   // (I guess?)
  //   this.callbacks.clear();
  // }
}

export default Scene;
