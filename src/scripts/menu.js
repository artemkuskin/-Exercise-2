let subwayLogo = require("../i/markets/subway_logo.png");
let donerLogo = require("../i/img/doner.png");
let chickenLogo = require("../i/img/south_fried_chicken.png");
let Button = require("./components/counter");
const { createStore } = require("./reduxFile/redux2");
const { menuReducer } = require("./reduxFile/rootReducer");
const {menuStore} = require('./reduxFile/sore')
let menuStore2 = createStore(menuReducer, {});

class Menu {
  root;

  #state = {
    category: "",
    menu: menuStore2.getState(),
  };

  set state(newState) {
    this.#state = newState;

    this.render();
  }

  constructor(root) {
    this.root = root;
      
    this.render();

    menuStore.subscribe(this.render.bind(this));
  }

  async render() {
    this.#state.category = menuStore.getState()
    let menu = await menuStore2.getState();

    this.root.innerHTML = "";

    for (let key in menu) {
      
      let img =
        menu[key].category && menu[key].image
          ? require(`../i/${menu[key].category}/${menu[key].image}`)
          : "";

      let out = "";

      if (menu[key].category === this.#state.category) {
        out += `<div class="products" id= ${menu[key].id + 1} >`;
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
                      <p class="item-text" id="${"b" + menu[key].id}"> ${
          menu[key].name
        }
                      </p> </div>
                       <div class="link"> <a href="#" class="item-link"> ${
                         menu[key].description
                       }</a> </div>
                      <p class="container-text"> Цена <strong class="price-one" id="${
                        "v" + menu[key].id
                      }"> 
                      ${menu[key].price}</strong> руб</p> 
                  <p class="item-link-text">КОЛИЧЕСТВО</p>
                  <div class="counter${+menu[key].id}" id="${
          "123" + menu[key].id
        }">
                  </div>
                  <button class="edit-button" id="${[key]
                  }"> В КОРЗИНУ  </button> 
                 </div>`;
        this.root.innerHTML += out;

      }
    }
    

    for (let key in menu) {
      if (menu[key].category === this.#state.category) {
        const button = new Button(
          document
            .getElementById("container")
            .querySelector(`.counter${+menu[key].id}`)
        );
        let addButton = document.getElementById(`${[key]}`)
      }
    }
  }
}

module.exports = Menu;
