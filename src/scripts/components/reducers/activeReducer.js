export const activeReducer = (state, action) => {
  if (action.type === "active") {
    return (state = "modalActive");
  } else if (action.type === "close") {
    return (state = "fon");
  }
  return state;
};
