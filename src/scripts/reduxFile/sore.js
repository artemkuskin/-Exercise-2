import { categoryReducer } from "../components/reducers/rootReducer";
import { createStore } from "./redux2";
//import { addModalBasketElem } from "../components/reducers/addModalBasketElem";
import { modalReducer } from "../components/reducers/modalFillNameReducer";
import { addElemReducer } from "../components/reducers/addElemReducer";
import { menu } from "../../api/menu";
import { modalMemu } from "../../api/modalMenu";
//import { idReducer } from "../components/reducers/idReducer";

export const menuStore = createStore(categoryReducer);
export const addBasketStore = createStore(addElemReducer);
export const modalFillNameStore = createStore(modalReducer);//modal
export const getMenu = createStore(menu);
export const getModalMenu = createStore(modalMemu);
//export const idStore = createStore(idReducer, 1);

// const store = {
//   menu: {
//     items: [],
//     selectedItem: null,
//   },
//   products: [],
//   fillings: {},
//   modal: {
//     product: {}
//   },
//   basket: [],
// };

// producst: [
//     {
//         "name": "Соус томатный кетчуп (порц)",
//         "count": 1,
//         "id": "57",
//         "description": "классический вкус Heinz",
//         "image": "tomatniy1.png",
//         "price": 20,
//         "category": "chicken",
//         "market": "sfc",
//         "type": "single",
//         "weight": 1
//     }
// ]

// basket: [
//     {
//         id: , name: , proice: , amount: 
//     }
// ];
