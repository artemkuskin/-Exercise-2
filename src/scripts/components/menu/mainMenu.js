const pubsub = require("../../pubSub/pubsub");
const { menuStore } = require("../../reduxFile/sore");

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
    let category = menuStore.getState().menu
    document.addEventListener("click", function (e) {
      if (e.target.classList.contains("menu-link")) menuStore.dispatch({ type: e.target.id });
    });
  }

  render() {
    pubsub.subscribe("category", (data) => {
      this.#state.list = data.categoryMenu;
      for (category in this.#state.list) {
        const html = `
        <p class="menu-link"  id="${this.#state.list[category]}">${this.#state.list[category].toUpperCase()}</p>
            `;
        this.root.innerHTML += html;
      }
    });
  }
}

module.exports = MainMenu;
