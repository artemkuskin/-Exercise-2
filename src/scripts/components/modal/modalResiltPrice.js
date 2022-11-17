const { addModalBasket, getModalMenu, modalFillNameStore } = require("../../reduxFile/sore");
const { menuStore, stepStore } = require("../../reduxFile/sore");
let modalMainMenu = getModalMenu;

export class ResultPrice {
  root;
  Sstate = {
    castomSandwichObj: 0,
    arr: [],
    basket: {},
    arrBasket: [],
  };

  set state(newState) {
    this.Sstate = newState;
    this.render();
  }

  constructor(root) {
    this.root = root;

    this.addListeber();

    this.render();
  }

  addListeber() {
    document.addEventListener("click", this.addElement.bind(this));
    document.addEventListener("click", this.resultSum.bind(this));
    document.addEventListener("click", this.displayActive.bind(this));
    document.addEventListener("click", this.createActive.bind(this));
    document.addEventListener("click", this.resetActive.bind(this));
    document.addEventListener("click", this.Price.bind(this));
  }

  Price(e) {
    let category = menuStore.getState().menu;
    if (e.target.classList.contains("edit-button") && category === "sandwiches") {
      this.Sstate.castomSandwichObj = modalFillNameStore.getState().modalBasket;
      this.Sstate.castomSandwichObj.result = this.Sstate.castomSandwichObj.price;
      this.render();
    }
  }

  async resultSum(e) {
    const menu = await modalMainMenu.getState();
    const basketModalObj = this.Sstate.castomSandwichObj;
    let arr = this.Sstate.arr;
    let obj = {};
    const components = basketModalObj.components;
    let sum = 0;

    if (e.target.classList.contains("ingredients-small")) {
      if (!document.querySelector(".active")) {
        this.Sstate.arr = [];
        for (let key in components) {
          if (menu[components[key]]) {
            (obj = {
              id: menu[components[key]].id,
              category: menu[components[key]].category,
            }),
              (sum += menu[components[key]].price);
            this.Sstate.arr.push(obj);
          }
        }
        obj = {};
      } else {
        for (let key in arr) {
          if (arr[key].id === menu[e.target.id].id) {
            arr.splice([key], 1);
            this.Sstate.castomSandwichObj.components[menu[e.target.id].category] = undefined;
            console.log(menu[e.target.id].id);
          }
        }
      }
      let res = this.Sstate.castomSandwichObj.price + sum;
      this.Sstate.castomSandwichObj.result = res;
      console.log(this.Sstate);
    }
    this.render();
  }

  async addElement(e) {
    let basket = modalFillNameStore.getState().modalBasket;
    this.Sstate.basket = basket;
    let menu = await modalMainMenu.getState();
    let veget = [];
    if (e.target.classList.contains("ingredients-small")) {
      if (menu[e.target.id].category === "sizes") {
        basket.components.sizes = e.target.id;
      } else if (menu[e.target.id].category === "breads") {
        basket.components.breads = e.target.id;
      } else if (menu[e.target.id].category === "vegetables") {
        basket.components.vegetables = e.target.id;
      } else if (menu[e.target.id].category === "sauces") {
        basket.components.sauces = e.target.id;
      } else if (menu[e.target.id].category === "fillings") {
        basket.components.fillings = e.target.id;
      }
    }
  }

  createActive(e) {
    let arr = this.Sstate.arr;
    if (
      e.target.classList.contains("content__ingredients-button-next") ||
      e.target.classList.contains("content__ingredients-button-next-back")
    ) {
      for (let key in arr) {
        if (arr[key].category === menuStore.getState().modal) {
          document.getElementById(arr[key].id).className = "active";
        }
        console.log(arr);
      }
    }
  }

  async displayActive(e) {
    let menu = await modalMainMenu.getState();
    if (e.target.classList.contains("ingredients-small")) {
      if (!document.querySelector(".active")) {
        document.getElementById(menu[e.target.id].id).className = "active";
      } else if (document.querySelector(".active")) {
        document.querySelector(".active").className = "price-popup";
      }
      console.log(this.Sstate.arr);
    }
  }

  resetActive(e) {
    if (e.target.classList.contains("edit-button-modal") || e.target.classList.contains("close_modal_window")) {
      this.Sstate.arr = [];
    }
  }

  render() {
    // removeEventListener
    this.root.innerHTML = "";
    let html = "";
    html = `
       <strong id="itog-price">Итого: ${this.Sstate.castomSandwichObj.result} руб</strong>
          `;
    this.root.innerHTML = html;
  }
}
