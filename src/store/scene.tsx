import { atom } from 'jotai';

import { Element, FrameElement } from '@/types';
import { SceneStateCallback } from '@/types/Scene';

export const callbacks_sceneAtom = atom<Set<SceneStateCallback>>(
  new Set<SceneStateCallback>()
);

export const nonDeletedElements_sceneAtom = atom<Element[]>([]);
export const frames_sceneAtom = atom<FrameElement[]>([]);
export const nonDeletedFrames_sceneAtom = atom<FrameElement[]>([]);

export const elements_sceneAtom = atom<Record<Element['id'], Element>>({});
export const activeElement_sceneAtom = atom<Element['id'] | null>(null);
export const selectedElement_sceneAtom = atom<Element['id'] | null>(null);
