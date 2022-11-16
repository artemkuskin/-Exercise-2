export function rootReducer(state, action) {
  if (action.type === "sandwiches") {
    return (state = action.type);
  } else if (action.type === "pizza") {
    return (state = action.type);
  } else if (action.type === "burgers") {
    return (state = action.type);
  } else if (action.type === "shaurma") {
    return (state = action.type);
  } else if (action.type === "chicken") {
    return (state = action.type);
  } else if (action.type === "salads") {
    return (state = action.type);
  } else if (action.type === "drinks") {
    return (state = action.type);
  }
  return state;
}
