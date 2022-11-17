const { stepStore, counterCategoryStore, modalFillNameStore, menuStore } = require("../../reduxFile/sore");

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
    modalFillNameStore.subscribe(() => {
      count = modalFillNameStore.getState().counter;
    });
    store.dispatch({ type: "fillName" });
    this.#state.list = store.getState().fillName;
    let count = modalFillNameStore.getState().counter;
    const arrCategory = this.#state.list;
    document.addEventListener("click", function (e) {
      if (e.target.classList.contains("content__ingredients-button-next")) {
        console.log(count);
        if (count === arrCategory.length - 1) {
          menuStore.dispatch({ type: arrCategory[count] });
        } else {
          count++;
          menuStore.dispatch({ type: arrCategory[count] });
          if (arrCategory[count] === menuStore.getState().modal) {
            document.getElementById(arrCategory[count]).className = "step";
            document.getElementById(arrCategory[count - 1]).className = "categories-link";
          }
        }
      } else if (e.target.classList.contains("content__ingredients-button-next-back")) {
        if (count === 0) {
          menuStore.dispatch({ type: arrCategory[count] });
        } else {
          count--;
          menuStore.dispatch({ type: arrCategory[count] });
          if (arrCategory[count] === menuStore.getState().modal) {
            document.getElementById(arrCategory[count]).className = "step";
            document.getElementById(arrCategory[count + 1]).className = "categories-link";
          }
        }
      }
      modalFillNameStore.dispatch({ type: "counter", payload: count });
    });
  }

  render() {
    for (category in this.#state.list) {
      const html = `
        <a class="categories-link"  id="${this.#state.list[category]}">${this.#state.list[category]}</a>
            `;
      this.root.innerHTML += html;
    }
  }
}

module.exports = FillName;
