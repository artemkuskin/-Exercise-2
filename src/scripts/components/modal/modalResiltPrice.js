const { addModalBasket, getModalMenu } = require("../../reduxFile/sore");
const { menuStore, stepStore } = require("../../reduxFile/sore");
let modalMainMenu = getModalMenu;

export class ResultPrice {
  root;
  #state = {
    castomSandwichObj: 0,
    arr: [],
    basket: {},
    arrBasket: [],
  };

  set state(newState) {
    this.#state = newState;
    this.render();
  }

  constructor(root) {
    this.root = root;

    this.addListeber();

    this.render();
  }

  //ревлизовать через сетстайт
  Price(e) {
    let category = menuStore.getState()
    if (
      e.target.classList.contains("edit-button") &&
      category === "sandwiches"
    ) {
      this.#state.castomSandwichObj = addModalBasket.getState();
      this.#state.castomSandwichObj.result =
        this.#state.castomSandwichObj.price;
      this.render();
    }
  }

  addListeber() {
    document.addEventListener("click", this.resultSum.bind(this));
    document.addEventListener("click", this.createActive.bind(this));
    document.addEventListener("click", this.displayActive.bind(this));
    document.addEventListener("click", this.resetActive.bind(this));
    document.addEventListener("click", this.Price.bind(this));
    document.addEventListener("click", this.addElement.bind(this));
  }

  async resultSum(e) {
    const menu = await modalMainMenu.getState();
    const basketModalObj = this.#state.castomSandwichObj;
    let sum = 0;
    const components = basketModalObj.components;

    if (e.target.classList.contains("ingredients-small")) {
      this.#state.arr = [];
      for (let key in components) {
        if (menu[components[key]]) {
          this.#state.arr.push({
            obj: {
              id: menu[components[key]].id,
              category: menu[components[key]].category,
            },
          });

          sum += menu[components[key]].price;
        }
      }
      let res = this.#state.castomSandwichObj.price + sum;
      this.#state.castomSandwichObj.result = res;
    }
    this.render();
  }

  async addElement(e) {
    let basket = addModalBasket.getState();
    this.#state.basket = basket;
    let menu = await modalMainMenu.getState();
    if (e.target.classList.contains("ingredients-small")) {
      if (menu[e.target.id].category === "sizes") {
        basket.components.size = e.target.id;
      } else if (menu[e.target.id].category === "breads") {
        basket.components.bread = e.target.id;
      } else if (menu[e.target.id].category === "vegetables") {
        basket.components.vegetable = e.target.id;
      } else if (menu[e.target.id].category === "sauces") {
        basket.components.sauce = e.target.id;
      } else if (menu[e.target.id].category === "fillings") {
        basket.components.filling = e.target.id;
      }
    }
  }

  createActive(e) {
    let arr = this.#state.arr;
    if (
      e.target.classList.contains("content__ingredients-button-next") ||
      e.target.classList.contains("content__ingredients-button-next-back")
    ) {
      for (let key in arr) {
        if (arr[key].obj.category === stepStore.getState()) {
          document.getElementById(arr[key].obj.id).className = "active";
        }
      }
    }
  }

  async displayActive(e) {
    let menu = await modalMainMenu.getState();
    let arr = this.#state.arr;
    if (e.target.classList.contains("ingredients-small")) {
      if (!document.querySelector(".active")) {
        for (let key in arr) {
          document.getElementById(menu[e.target.id].id).className = "active";
        }
      } else {
        document.querySelector(".active").className = "price-popup";
        document.getElementById(menu[e.target.id].id).className = "active";
      }
    }
  }

  resetActive(e) {
    if (
      e.target.classList.contains("edit-button-modal") ||
      e.target.classList.contains("close_modal_window")
    ) {
      this.#state.arr = [];
    }
  }

  render() {
    // removeEventListener
    this.root.innerHTML = "";
    let html = "";
    html = `
       <strong id="itog-price">Итого: ${
         this.#state.castomSandwichObj.result
       } руб</strong>
          `;
    this.root.innerHTML = html;
  }
}
