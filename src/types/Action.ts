import { Element } from '@/types/Elements';

export type ActionName = 'loadScene';

type ActionFn = (
  elements: readonly Element[]
) => ActionResult | Promise<ActionResult>;

export interface Action {
  name: ActionName;
  perform: ActionFn;
  viewMode?: boolean;
}

export type ActionResult = { elements?: readonly Element[] | null } | false;
