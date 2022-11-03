//const { createStore } = require("../reduxFile/redux2");
const { createStore, applyMiddleware } = require("redux");
const { default: logger } = require("redux-logger");
const { activReducer, menuReducer } = require("../reduxFile/rootReducer");
let menuStore = createStore(menuReducer);
let store = createStore(activReducer, "fon", applyMiddleware(logger));
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
    let menu = await menuStore.getState();
    if (
      e.target.classList.contains("edit-button") &&
      menu[e.target.id].category === "sandwiches"
    ) {
      store.dispatch({ type: "active" });
      document.getElementById("fon").className = this.#state.style;
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
