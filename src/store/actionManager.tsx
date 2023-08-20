import { atom } from 'jotai';

import { ActionManager } from '@/classes/ActionManager';

export const actionManagerAtom = atom<ActionManager | null>(null);
