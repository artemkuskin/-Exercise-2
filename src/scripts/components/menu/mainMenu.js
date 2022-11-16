const { menuStore, menuCategoryStore } = require("../../reduxFile/sore");

class MainMenu {
  root;
  #state = {
    list: [],
  };

  set state(newState) {
    this.#state = newState;

    this.render();
  }

  constructor(root) {
    this.root = root;
    this.addListeners();
    this.render();
  }

  addListeners() {
    document.addEventListener("click", function (e) {
      if (e.target.classList.contains("menu-link")) menuStore.dispatch({ type: e.target.id });
    });
  }

  render() {
    this.#state.list = menuCategoryStore.getState();

    for (category in this.#state.list) {
      const html = `
      <p class="menu-link"  id="${this.#state.list[category]}">${this.#state.list[category].toUpperCase()}</p>
          `;
      this.root.innerHTML += html;
    }
  }
}

module.exports = MainMenu;
