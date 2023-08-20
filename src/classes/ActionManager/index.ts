import { Element } from '@/types';
import { Action, ActionName } from '@/types/Action';
import { CanvasState } from '@/types/Canvas';

export class ActionManager {
  actions = {} as Record<ActionName, Action>;

  updater: (actionResult: any | Promise<any>) => void;

  getAppState: () => Readonly<Partial<CanvasState>>;
  getElementsIncludingDeleted: () => readonly Element[];

  constructor(
    updater: any,
    getAppState: () => Partial<CanvasState>,
    getElementsIncludingDeleted: () => readonly Element[]
  ) {
    this.updater = (actionResult) => {
      if (actionResult && 'then' in actionResult) {
        actionResult.then((actionResult: any) => {
          return updater(actionResult);
        });
      } else {
        return updater(actionResult);
      }
    };
    this.getAppState = getAppState;
    this.getElementsIncludingDeleted = getElementsIncludingDeleted;
  }

  registerAction(action: Action) {
    this.actions[action.name] = action;
  }

  registerAll(actions: readonly Action[]) {
    actions.forEach((action) => this.registerAction(action));
  }

  executeAction(action: Action, source: string, value: any = null) {
    const elements = this.getElementsIncludingDeleted();
    const appState = this.getAppState();

    // trackAction(action, source, appState, elements, this.app, value);
    this.updater(action.perform(elements));
  }
}
