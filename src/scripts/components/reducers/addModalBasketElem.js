export const addModalBasketElem = (state, action) => {
  if (action.type === "basketElem") {
    return (state = { ...action.payload });
  }
  return state;
};
