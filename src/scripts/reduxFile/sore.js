import { rootReducer } from "../components/reducers/rootReducer";
import { createStore } from "./redux2";
import { modalRootReducer } from "../components/reducers/modalRootReducer";
import { addModalBasketElem } from "../components/reducers/addModalBasketElem";
import { modalFillNameReducer } from "../components/reducers/modalFillNameReducer";
import { basketReducer } from "../components/reducers/basketReducer";
import { addElemReducer } from "../components/reducers/addElemReducer";
import { basketModalReducer } from "../components/reducers/basketModalReducer";
import { counterCategoryReducer } from "../components/reducers/counterCategoryReducer";
import { activeReducer } from "../components/reducers/activeReducer";
import { menu } from "../components/api/menu";
import { modalMemu } from "../components/api/modalMenu";
import { menuCategoryReducer } from "../components/reducers/menuCategoryReducer";

export const menuStore = createStore(rootReducer, "pizza");
export const stepStore = createStore(modalRootReducer, "sizes");
export const addModalBasket = createStore(addModalBasketElem);
export const basketStore = createStore(basketReducer, []);
export const basketModalStore = createStore(basketModalReducer, {});
export const counterCategoryStore = createStore(counterCategoryReducer, 0);
export const addBasketStore = createStore(addElemReducer);
export const modalFillNameStore = createStore(modalFillNameReducer, [])
export const activeStore = createStore(activeReducer, 'fon')
export const getMenu = createStore(menu)
export const getModalMenu = createStore(modalMemu);
export const menuCategoryStore = createStore(menuCategoryReducer)

