const {
  stepStore,
  counterCategoryStore,
  modalFillNameStore,
} = require("../../reduxFile/sore");

class FillName {
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
    const store = modalFillNameStore;
    counterCategoryStore.subscribe(() => {
      count = counterCategoryStore.getState();
    });
    store.dispatch({ type: "fillName" });
    this.#state.list = store.getState();
    let count = counterCategoryStore.getState();
    const arrCategory = this.#state.list;
    document.addEventListener("click", function (e) {
      if (e.target.classList.contains("content__ingredients-button-next")) {
        console.log(count);
        if (count === arrCategory.length - 1) {
          stepStore.dispatch({ type: arrCategory[count] });
        } else {
          count++;
          stepStore.dispatch({ type: arrCategory[count] });
          if (store.getState()[count] === stepStore.getState()) {
            document.getElementById(store.getState()[count]).className = "step";
            document.getElementById(store.getState()[count - 1]).className =
              "categories-link";
          }
        }
      } else if (
        e.target.classList.contains("content__ingredients-button-next-back")
      ) {
        if (count === 0) {
          stepStore.dispatch({ type: arrCategory[count] });
        } else {
          count--;
          stepStore.dispatch({ type: arrCategory[count] });
          if (store.getState()[count] === stepStore.getState()) {
            document.getElementById(store.getState()[count]).className = "step";
            document.getElementById(store.getState()[count + 1]).className =
              "categories-link";
          }
        }
      }
      counterCategoryStore.dispatch({ type: "counter", payload: count });
    });
  }

  render() {
    for (category in this.#state.list) {
      const html = `
        <a class="categories-link"  id="${this.#state.list[category]}">${
        this.#state.list[category]
      }</a>
            `;
      this.root.innerHTML += html;
    }
  }
}

module.exports = FillName;
