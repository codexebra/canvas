import { atom } from 'jotai';

import { EventType } from '@/types/Events';

export const previousEvent_eventsAtom = atom<EventType | null>(null);
