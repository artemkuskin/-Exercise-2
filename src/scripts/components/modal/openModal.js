const { menuStore, getMenu } = require("../../reduxFile/sore");
const {
  addModalBasket,
  stepStore,
  counterCategoryStore,
  activeStore,
} = require("../../reduxFile/sore");
const getMainMenu = getMenu;
let store = activeStore;
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
    document.addEventListener("click", this.modalOpan.bind(this));
    document.addEventListener("click", this.modalClose.bind(this));
    document.addEventListener("click", this.addBasketAndModalCloce.bind(this));
    store.subscribe(this.render.bind(this));
    this.render();
  }

  async modalOpan(e) {
    const menu = await getMainMenu.getState();
    this.#state.category = menuStore.getState();

    if (
      e.target.classList.contains("edit-button") &&
      this.#state.category === "sandwiches"
    ) {
      console.log(counterCategoryStore.getState());
      store.dispatch({ type: "active" });

      document.getElementById("fon").className = this.#state.style;
      addModalBasket.dispatch({
        type: "basketElem",
        payload: menu[e.target.id],
      });
      stepStore.dispatch({ type: "sizes" });
      if (document.querySelector(".step")) {
        document.querySelector(".step").className = "categories-link";
      }
      document.getElementById(stepStore.getState()).className = "step";
      console.log({ ...addModalBasket.getState() });
    }
  }

  modalClose(e) {
    if (e.target.classList.contains("close_modal_window")) {
      store.dispatch({ type: "close" });
      counterCategoryStore.dispatch({ type: "counter", payload: 0 });
      document.getElementById("fon").className = this.#state.style;
    }
  }

  addBasketAndModalCloce(e) {
    if (e.target.classList.contains("edit-button-modal")) {
      store.dispatch({ type: "close" });
      document.getElementById("fon").className = this.#state.style;
      counterCategoryStore.dispatch({ type: "counter", payload: 0 });
    }
  }

  render() {
    this.#state.style = store.getState();
  }
}

module.exports = Modal;
