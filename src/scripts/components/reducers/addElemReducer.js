import { combineReducers } from "redux";

const defaultState = {
  elem: [],
  sum: 0,
};

const addElemReducer2 = (state = defaultState, action) => {
  switch (action.type) {
    case "addBasket":
      const newState = { ...state, elem: [...state.elem, action.payload] };
      const sum = newState.elem.reduce((prev, curr) => prev + curr.price * curr.amount, 0);
      return { ...newState, sum };
    case "deleteElem":
      state.elem.splice(action.payload, 1);
      return { ...state };
    default:
      return state;
  }
};

const itogSum = (state = 0, action) => {
  switch (action.type) {
    case "addSum":
      return (state = action.payload);
    default:
      return state;
  }
};

export const addElemReducer = combineReducers({
  arr: addElemReducer2,
  sum: itogSum,
});

// https://redux.js.org/usage/structuring-reducers/refactoring-reducer-example
