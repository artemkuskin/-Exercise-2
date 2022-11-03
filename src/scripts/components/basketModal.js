const { createStore, applyMiddleware } = require("redux");
const { default: logger } = require("redux-logger");
const {
  basketModal,
  menuReducer,
  modalReducer,
} = require("../reduxFile/rootReducer");

let menuStore = createStore(modalReducer);
let store = createStore(basketModal, []);

class BasketModal {
  root;
  #state = {
    basket: {},
  };

  set state(newState) {
    this.#state = newState;
    this.render();
  }

  constructor(root) {
    this.root = root;
    store.subscribe(this.render.bind(this));
    document.addEventListener("click", this.addElement.bind(this));
    this.render();
  }

  async addElement(e) {
    let menu = await menuStore.getState();
    let arrBasket = store.getState();
    if (e.target.classList.contains("ingredients-small")) {

                store.dispatch({ type: "addBasketModal" });
                this.#state.basket.name = menu[e.target.id].name;
                this.#state.basket.id = menu[e.target.id].id;
                this.#state.basket.price = menu[e.target.id].price;
                this.#state.basket.category = menu[e.target.id].category;
                arrBasket.push({ ...this.#state.basket }); 
      // for (let key in arrBasket) {
      //    if( arrBasket[key].category === menu[e.target.id].category) {
      //     arrBasket[key].name = menu[e.target.id].name
      //     arrBasket[key].id = menu[e.target.id].id
      //     arrBasket[key].price = menu[e.target.id].price
      //    }
      // }

      console.log(arrBasket);
    }
  }

  render() {
    // removeEventListener
  }
}

module.exports = BasketModal;
