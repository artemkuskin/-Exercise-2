

const { createStore } = require("../reduxFile/redux2");
const { basketModal, modalReducer } = require("../reduxFile/rootReducer");
const {addModalBasket} = require('../reduxFile/sore')
let menuStore = createStore(modalReducer);
let store = createStore(basketModal, {});

class BasketModal {
  root;
  #state = {
    basket:{}
    
  };

  set state(newState) {
    this.#state = newState;
    this.render();
  }

  constructor(root) {
    this.root = root;
    //store.subscribe(this.render.bind(this));
    //this.#state.basket =  modalBasket.getState();
    document.addEventListener("click", this.addElement.bind(this));
    //document.addEventListener("click", this.resultPriceModal.bind(this));

    this.render();
  }

  async addElement(e) {
    let basket = addModalBasket.getState()
    this.#state.basket = basket
    let menu = await menuStore.getState();
    if (e.target.classList.contains("ingredients-small")) {
      
      if (menu[e.target.id].category === "sizes") {
         basket.components.size = e.target.id;
         //basket.components.size.price = menu[e.target.id].price;
      } else if (menu[e.target.id].category === "breads") {
        basket.components.bread = e.target.id;
      } else if (menu[e.target.id].category === "vegetables") {
        basket.components.vegetable = e.target.id;
      } else if (menu[e.target.id].category === "sauces") {
        basket.components.sauce = e.target.id;
      } else if (menu[e.target.id].category === "fillings") {
        basket.components.filling = e.target.id;
      }
      console.log(this.#state);
    }
  }

//  async resultPriceModal(e) {
//      let menu = await menuStore.getState();
    
//     // // let arr = this.#state.id
//     // // let idElem
    
//      if (e.target.classList.contains("ingredients-small")) {
//       if (menu[e.target.id].name === this.#state.basket.components.size) {
//         // this.#state.basket.price = this.#state.basket.price
//         console.log(this.#state.basket.components.size);
//       } else {
//       this.#state.basket.price += menu[e.target.id].price 
//       }
      
//       console.log(this.#state.basket);
      
//     }
    
//   }


  render() {
    // removeEventListener
    this.#state.basket = addModalBasket.getState()
    //this.resultPriceModal.bind(this)
    
  }
}

module.exports = BasketModal;
