export function modalRootReducer(state, action) {
  if (action.type === "sizes") {
    return (state = action.type);
  } else if (action.type === "breads") {
    return (state = action.type);
  } else if (action.type === "vegetables") {
    return (state = "vegetables");
  } else if (action.type === "sauces") {
    return (state = action.type);
  } else if (action.type === "fillings") {
    return (state = action.type);
  } else if (action.type === "result") {
    return (state = action.type);
  }
  return state;
}
