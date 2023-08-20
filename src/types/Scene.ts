/* eslint-disable @typescript-eslint/no-explicit-any */
export type SceneStateCallback = () => void;
export type SceneStateCallbackRemover = () => void;
export type ListenersIds = 'callback' | 'elements';
export type Listeners = Record<ListenersIds, Array<(...args: any) => any>>;
