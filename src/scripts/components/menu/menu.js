const subwayLogo = require("../../../i/img/subway.png");
const donerLogo = require("../../../i/img/doner.png");
const chickenLogo = require("../../../i/img/south_fried_chicken.png");
const { menuStore, getMenu } = require("../../reduxFile/sore");
const menuStore2 = getMenu;

class Menu {
  root;

  #state = {
    category: "",
    menu: "",
    amount: 1,
  };

  set state(newState) {
    this.#state = newState;

    this.render();
  }

  constructor(root) {
    this.root = root;
    document.addEventListener("click", this.increment.bind(this));
    document.addEventListener("click", this.decrement.bind(this));
    this.render();

    menuStore.subscribe(this.render.bind(this));
  }

  async increment(e) {
    const menu = await menuStore2.getState();
    if (e.target.classList.contains("increase")) {
      menu[e.target.id].count += 1;
      this.#state.amount += 1;
      this.render();
    }
  }

  async decrement(e) {
    const menu = await menuStore2.getState();
    if (e.target.classList.contains("decrease")) {
      menu[e.target.id].count -= 1;
      this.#state.amount -= 1;
      this.render();
    }
  }

  async render() {
    this.#state.category = menuStore.getState();
    const menu = await menuStore2.getState();

    this.root.innerHTML = "";

    for (let key in menu) {
      let img =
        menu[key].category && menu[key].image ? require(`../../../i/${menu[key].category}/${menu[key].image}`) : "";

      let out = "";

      if (menu[key].category === this.#state.category) {
        out += `<div class="products" id= ${menu[key].id + 111} >`;
        if (menu[key].market === "subway") {
          out += `<img src='${subwayLogo}' class="item-img">`;
        } else if (menu[key].market === "sfc") {
          out += `<img src="${chickenLogo}" class="item-img">`;
        } else if (menu[key].market === "doner") {
          out += `<img src="${donerLogo}" class="item-img">`;
        }
        out += `<div class="price-boll3">
                   <div class="price-boll">
                      <img src="${img} "
                       class="img" id="${"y" + menu[key].id}"> </div></div>
                  <div class="text">
                      <p class="item-text" id="${"b" + menu[key].id}"> ${menu[key].name}
                      </p> </div>
                       <div class="link"> <a href="#" class="item-link"> ${menu[key].description}</a> </div>
                      <p class="container-text"> Цена <strong class="price-one" id="${"v" + menu[key].id}"> 
                      ${menu[key].price}</strong> руб</p> 
                  <p class="item-link-text">КОЛИЧЕСТВО</p>
                  <div id="${key * 1000}">
                  <button class="increase" id=${key}> + </button>
                  <input type="number"  value='${menu[key].count}' class="input" readonly>
                  <button class ="decrease" id=${key}> - </button>
                  
                  </div>
                  <button class="edit-button" id="${[key]}"> В КОРЗИНУ  </button> 
                 </div>`;
        this.root.innerHTML += out;
      }
    }
  }
}

module.exports = Menu;
