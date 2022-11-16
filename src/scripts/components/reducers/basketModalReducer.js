export const basketModalReducer = (state, action) => {
  if (action.type === "addBasketModal") {
    return { ...state };
  }
  return state;
};
