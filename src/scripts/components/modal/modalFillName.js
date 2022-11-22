const { stepStore, counterCategoryStore, modalFillNameStore, menuStore } = require("../../reduxFile/sore");

class FillName {
  root;
  #state = {
    list: [],
    count: 0
  };

  set state(newState) {
    this.#state = newState;
    this.render();
  }

  constructor(root) {
    this.root = root;
   modalFillNameStore.subscribe(() => {
    this.#state.count = modalFillNameStore.getState().counter
   })
    this.render();
  }

  

  render() {
    const store = modalFillNameStore;
    this.#state.list = store.getState().fillName;
    for (category in this.#state.list) {
      const html = `
        <a class="categories-link"  id="${this.#state.list[category]}">${this.#state.list[category]}</a>
            `;
      this.root.innerHTML += html;
    }
  }
}

module.exports = FillName;
