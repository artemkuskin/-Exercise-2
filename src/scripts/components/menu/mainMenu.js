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
    this.render();
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
      for (let key in this.#state.list) {
        let btn = document.querySelector(`#${this.#state.list[key]}`);
        btn.addEventListener("click", function (e) {
          menuStore.dispatch({ type: e.target.id });
          if (document.getElementById(menuStore.getState().menu) && !document.querySelector('.targetCategory')) {
            document.getElementById(menuStore.getState().menu).className = 'targetCategory'
          }  else if (document.getElementById(menuStore.getState().menu) && document.querySelector('.targetCategory'))
          document.querySelector('.targetCategory'). className = 'menu-link'
          document.getElementById(menuStore.getState().menu).className = 'targetCategory'
        });
      }
    });
  }
}

module.exports = MainMenu;
