export function modalFillNameReducer(state, action) {
  if (action.type === "fillName") {
    return (state = [
      "sizes",
      "breads",
      "vegetables",
      "sauces",
      "fillings",
      "result",
    ]);
  }
  return state;
}
