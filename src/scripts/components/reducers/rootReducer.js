import { combineReducers } from "redux";

 function rootReducer(state = 'pizza', action) {
  switch (action.type) {
    case "sandwiches":
      return (state = action.type);
    case "pizza":
      return (state = action.type);
    case "burgers":
      return (state = action.type);
    case "shaurma":
      return (state = action.type);
    case "chicken":
      return (state = action.type);
    case "salads":
      return (state = action.type);
    case "drinks":
      return (state = action.type);
    default:
      return state;
  }
}

function modalRootReducer(state = 'sizes', action) {
  switch (action.type) {
    case "sizes":
      return (state = action.type);
    case "breads":
      return (state = action.type);
    case "vegetables":
      return (state = action.type);
    case "sauces":
      return (state = action.type);
    case "fillings":
      return (state = action.type);
    case "result":
      return (state = action.type);
      default: return state
  }
}

export const categoryReducer = combineReducers({
  menu: rootReducer,
  modal: modalRootReducer
})
