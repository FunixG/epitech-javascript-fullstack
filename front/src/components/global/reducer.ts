import { Action, ActionTypes } from './actions';

export interface Card {
  id: number;
  text: string;
}

export interface State {
  cards: Card[];
}

const initialState: State = {
  cards: [],
};

// eslint-disable-next-line @typescript-eslint/default-param-last
export const reducerPopup = (state = initialState, action: Action): State => {
  switch (action.type) {
    case ActionTypes.ADD_CARD:
      return {
        ...state,
        cards: [
          ...state.cards,
          { id: action.payload.id, text: action.payload.text },
        ],
      };
    case ActionTypes.REMOVE_CARD:
      return {
        ...state,
        cards: state.cards.filter((card) => card.id !== action.payload.id),
      };
    default:
      return state;
  }
};
