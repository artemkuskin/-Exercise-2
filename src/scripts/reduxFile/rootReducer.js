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

export function modalRootReducer(state, action) {
  if (action.type === "sizes") {
    return (state = "sizes");
  } else if (action.type === "breads") {
    return (state = "breads");
  } else if (action.type === "vegetables") {
    return (state = "vegetables");
  } else if (action.type === "sauces") {
    return (state = "sauces");
  } else if (action.type === "fillings") {
    return (state = "fillings");
  } else if (action.type === "result") {
    return (state = "result");
  }
  return state;
}

export const basketReducer = (state, action) => {
  if (action.type === "addBasket") {
    return state;
  }
  return state;
};

export const basketModal = (state, action) => {
  if (action.type === 'addBasketModal') {
    return state;
  }
  return state
}

export const sumReducer = (state, action) => {
  if (action.type === "updateSum") {
    return state + 1;
  }
  return state;
};

export const activReducer = (state, action) => {
  if (action.type === "active") {
    return (state = 'modalActive');
  } else if (action.type === "close") {
    return (state = 'fon');
  }
  return state;
};

export const menuReducer = async () => {
  let url = "http://localhost:7000/";
  let resp = await fetch(`${url}`);
  let result = await resp.json();
  let menu = result.menu;

  return menu;
};

export const modalReducer = async () => {
  let url = "http://localhost:7000/";
  let resp = await fetch(`${url}`);
  let result = await resp.json();
  let menu = result.menu2;

  return menu;
};