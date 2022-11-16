export const counterCategoryReducer = (state, action) => {
  if (action.type === "counter") {
    return (state = action.payload);
  }
  return state;
};
