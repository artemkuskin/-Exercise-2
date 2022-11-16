const defaultState = {
  elem: [],
  sum: 0,
};

// https://redux.js.org/usage/structuring-reducers/refactoring-reducer-example
export const addElemReducer = (state = defaultState, action) => {
  if (action.type === "addBasket") {
    const newState = { ...state, elem: [...state.elem, action.payload] };

    const sum = newState.elem.reduce(
      (prev, curr) => prev + curr.price * curr.amount,
      0
    );

    return { ...newState, sum };
  }
  return state;
};
