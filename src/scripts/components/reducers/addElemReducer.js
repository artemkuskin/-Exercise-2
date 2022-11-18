const defaultState = {
  elem: [],
  sum: 0,
};

export const addElemReducer = (state = defaultState, action) => {
  
  switch (action.type) {
    case "addBasket":
      const newState = { ...state, elem: [...state.elem, action.payload] };
      const sum = newState.elem.reduce((prev, curr) => prev + curr.price * curr.amount, 0);
      return { ...newState, sum };
      case 'deleteElem':
      state.elem.splice(action.payload, 1)
      const sum2 = state.elem.reduce((prev, curr) => prev + curr.price * curr.amount, 0);
        return {...state, sum2}
    default:
      return state;
  }
};


// https://redux.js.org/usage/structuring-reducers/refactoring-reducer-example

