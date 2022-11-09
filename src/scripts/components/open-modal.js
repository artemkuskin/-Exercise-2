const { createStore } = require("../reduxFile/redux2");

const { activReducer, menuReducer } = require("../reduxFile/rootReducer");

const {menuStore} = require('../reduxFile/sore')
let menuStore2 = createStore(menuReducer);
let store = createStore(activReducer, "fon");
const {addModalBasket} = require('../reduxFile/sore')
class Modal {
  root;
  #state = {
    style: "",
  };

  set state(newState) {
    this.#state = newState;
    this.render();
  }

  constructor(root) {
    this.root = root;
    document.addEventListener("click", this.modalOpan.bind(this));
    document.addEventListener("click", this.modalClose.bind(this));
    store.subscribe(this.render.bind(this));
    this.render();
  }

  async modalOpan(e) {
    let menu = await menuStore2.getState();
    
    if (
      e.target.classList.contains("edit-button") &&
      menuStore.getState() === "sandwiches"
    ) {
     
      store.dispatch({ type: "active" });
      document.getElementById("fon").className = this.#state.style;
      addModalBasket.dispatch({type: 'basketElem', payload: menu[e.target.id]})
      console.log({...addModalBasket.getState()});
    }
  
  }

  modalClose(e) {
    if (e.target.classList.contains("close_modal_window")) {
      store.dispatch({ type: "close" });
      document.getElementById("fon").className = this.#state.style;
      
    }
  }

  render() {
    this.#state.style = store.getState();
  }
}

module.exports = Modal;
