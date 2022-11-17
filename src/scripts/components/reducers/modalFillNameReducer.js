import { combineReducers } from "redux";
const initState = ["sizes", "breads", "vegetables", "sauces", "fillings", "result"]
 const modalFillNameReducer = (state = initState, action) => {
  switch (action.type) {
    case "fillName":
      return state ;
    default:
      return state;
  }
}

const activeReducer = (state = 'fon', action) => {
  switch (action.type) {
    case "active":
      return (state = "modalActive");
    case "close":
      return (state = "fon");
    default:
      return state;
  }
};

const counterCategoryReducer = (state = 0, action) => {
  switch (action.type) {
    case "counter":
      return (state = action.payload);
    default:
      return state;
  }
};

const addModalBasketElem = (state = {}, action) => {
  switch (action.type) {
    case "basketElem":
      return (state = { ...action.payload });
    default:
      return state;
  }
};

const idReducer = (state = '', action) => {
  switch (action.type) {
    case 'addId':
      return (state = action.payload);
    default:
      return state;
  }
};

export const modalReducer = combineReducers({
  fillName: modalFillNameReducer,
  open: activeReducer,
  counter: counterCategoryReducer,
  modalBasket: addModalBasketElem,
  id: idReducer
})