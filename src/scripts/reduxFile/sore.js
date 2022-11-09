import { createStore } from "./redux2";

const { rootReducer, modalRootReducer, addModalBasketElem } = require("./rootReducer");



export const menuStore = createStore(rootReducer, "pizza");
export const stepStore = createStore(modalRootReducer, "sizes");
export const addModalBasket = createStore(addModalBasketElem)
