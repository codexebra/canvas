import { atom } from 'jotai';

import { ActiveTool } from '@/types/Tools';

export const activeTool_toolAtom = atom<ActiveTool>({ type: 'line' });
