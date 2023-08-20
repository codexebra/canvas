import { useAtomValue } from 'jotai';

import { elements_sceneAtom } from '@/store/scene';

export async function useGetElementsIncludingDeleted() {
  return useAtomValue(elements_sceneAtom);
}
