export const basketReducer = (state, action) => {
  if (action.type === "addBasket") {
    return [...state];
  } else if (action.type === "asd") {
    return (state = [...state]);
  }
  return state;
};
