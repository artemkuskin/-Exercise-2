import { categoryReducer } from "../components/reducers/rootReducer";
import { createStore } from "./redux";
import { modalReducer } from "../components/reducers/modalFillNameReducer";
import { addElemReducer } from "../components/reducers/addElemReducer";

export const menuStore = createStore(categoryReducer);
export const addBasketStore = createStore(addElemReducer);
export const modalFillNameStore = createStore(modalReducer);//modal

