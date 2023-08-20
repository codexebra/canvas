import { atom } from 'jotai';

import { Action } from '@/types/Action';

export const actionsAtom = atom<readonly Action[]>([]);
