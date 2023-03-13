export enum ActionTypes {
  ADD_CARD = 'ADD_CARD',
  REMOVE_CARD = 'REMOVE_CARD',
}

interface AddCardAction {
  type: ActionTypes.ADD_CARD;
  payload: {
    id: number;
    text: string;
  };
}

interface RemoveCardAction {
  type: ActionTypes.REMOVE_CARD;
  payload: {
    id: number;
  };
}

export const addCard = (id: number, text: string): AddCardAction => ({
  type: ActionTypes.ADD_CARD,
  payload: { id, text },
});

export const removeCard = (id: number): RemoveCardAction => ({
  type: ActionTypes.REMOVE_CARD,
  payload: { id },
});

export type Action = AddCardAction | RemoveCardAction;
