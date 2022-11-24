const pubsub = require("../../pubSub/pubsub");
const { menuStore } = require("../../reduxFile/sore");

class MainMenu {
  root;
  #state = {
    list: ["pizza", "burgers", "sandwiches", "shaurma", "chicken", "salads", "drinks"],
  };

  set state(newState) {
    this.#state = newState;

    this.render();
  }

  constructor(root) {
    this.root = root;
    menuStore.subscribe(() => {
      this.render();
    });
    this.render();
  }

  render() {
    this.root.innerHTML = "";
    for (category in this.#state.list) {
      const html = `
        <p class="menu-link ${this.#state.list[category] === menuStore.getState().menu ? "targetCategory" : ""}"  id="${
        this.#state.list[category]
      }">${this.#state.list[category].toUpperCase()}</p>
            `;
      this.root.innerHTML += html;
    }
    for (let key in this.#state.list) {
      let btn = document.querySelector(`#${this.#state.list[key]}`);
      btn.addEventListener("click", function (e) {
        menuStore.dispatch({ type: e.target.id });
      });
    }
  }
}

module.exports = MainMenu;
