const { menuStore, getMenu, modalFillNameStore } = require("../../reduxFile/sore");
const { addModalBasket, stepStore, counterCategoryStore, activeStore } = require("../../reduxFile/sore");
const getMainMenu = getMenu;
let store = modalFillNameStore;
class Modal {
  root;
  #state = {
    style: "",
    category: "",
    modalCategory: "",
  };

  set state(newState) {
    this.#state = newState;
    this.render();
  }

  constructor(root) {
    this.root = root;
    this.addListeners()
    store.subscribe(this.render.bind(this));
    this.render();
  }

  addListeners () {
    document.addEventListener("click", this.modalOpan.bind(this));
    document.addEventListener("click", this.modalClose.bind(this));
    document.addEventListener("click", this.addBasketAndModalCloce.bind(this))
  }

  async modalOpan(e) {
    const menu = await getMainMenu.getState();
    this.#state.category = menuStore.getState().menu;
    let id = modalFillNameStore.getState().id

    if (e.target.classList.contains("edit-button") && this.#state.category === "sandwiches") {
      //console.log(counterCategoryStore.getState());
      store.dispatch({ type: "active" });

      document.getElementById("fon").className = this.#state.style;
      store.dispatch({
        type: "basketElem",
        payload: menu[id],
      });
      menuStore.dispatch({ type: "sizes" });
      if (document.querySelector(".step")) {
        document.querySelector(".step").className = "categories-link";
      }
      document.getElementById(menuStore.getState().modal).className = "step";
      console.log({ ...store.getState().modalBasket });
    }
  }

  modalClose(e) {
    if (e.target.classList.contains("close_modal_window")) {
      store.dispatch({ type: "close" });
      store.dispatch({ type: "counter", payload: 0 });
      document.getElementById("fon").className = this.#state.style;
    }
  }

  addBasketAndModalCloce(e) {
    if (e.target.classList.contains("edit-button-modal")) {
      store.dispatch({ type: "close" });
      document.getElementById("fon").className = this.#state.style;
      store.dispatch({ type: "counter", payload: 0 });
    }
  }

  render() {
    this.#state.style = store.getState().open;
  }
}

module.exports = Modal;
