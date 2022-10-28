export function rootReducer(state, action) {
  if (action.type === "sandwiches") {
    return (state = "sandwiches");
  } else if (action.type === "pizza") {
    return (state = "pizza");
  } else if (action.type === "burgers") {
    return (state = "burgers");
  } else if (action.type === "shaurma") {
    return (state = "shaurma");
  } else if (action.type === "chicken") {
    return (state = "chicken");
  } else if (action.type === "salads") {
    return (state = "salads");
  } else if (action.type === "drinks") {
    return (state = "drinks");
  }
  return state;
}

export const basketReduser = (state, action) => {
  if (action.type === 'addBasket') {
    return (state)
  }
 return state

}

export const menuReducer = async () => {
  let url = "http://localhost:7000/";
  let resp = await fetch(`${url}`);
  let result = await resp.json();
  let menu = result.menu;

  return menu;
};

