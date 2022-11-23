const subwayLogo = require("../../../i/img/subway.png");
const donerLogo = require("../../../i/img/doner.png");
const chickenLogo = require("../../../i/img/south_fried_chicken.png");
const { menuStore, modalFillNameStore, addBasketStore } = require("../../reduxFile/sore");
const activeModal = modalFillNameStore;

class Menu {
  root;
  contant;

  #state = {
    category: "",
    menu: "",
    amount: 1,
    obj: {},
    id: "",
  };

  set state(newState) {
    this.#state = newState;

    this.render();
  }

  constructor(root, contant) {
    this.contant = contant;
    this.root = root;
    this.render();
    menuStore.subscribe(this.render.bind(this), (this.#state.category = menuStore.getState().menu));
  }

  render() {
    this.#state.category = menuStore.getState().menu;
    const menu = this.contant.menu;
    this.root.innerHTML = "";

    for (let key in menu) {
      let img =
        menu[key].category && menu[key].image ? require(`../../../i/${menu[key].category}/${menu[key].image}`) : "";

      let out = "";

      if (menu[key].category === this.#state.category) {
        out += `<div class="products" id="product-${menu[key].id}">`;
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
                  <button class="increase" id='inc${key}'> + </button>
                  <input type="number"  value='${menu[key].count}' class="input" readonly>
                  <button class ="decrease" id='dec${key}'> - </button>
                  
                  </div>
                  <button class="edit-button" id="button${[key]}"> В КОРЗИНУ  </button> 
                 </div>`;
        this.root.innerHTML += out;
      }
    }
    for (let key in menu) {
      const btn = this.root.querySelector(`#button${key}`);
      const inc = document.querySelector(`#inc${key}`);
      const dec = document.querySelector(`#dec${key}`);
      let sum;
      if (menuStore.getState().menu !== "sandwiches") {
        if (inc && dec) {
          inc.addEventListener("click", function () {
            menu[key].count += 1;
            menuStore.dispatch({ type: "updateCount" });
          });
          dec.addEventListener("click", function () {
            menu[key].count -= 1;
            if (menu[key].count <= 1) {
              menu[key].count = 1;
            }
            menuStore.dispatch({ type: "updateCount" });
          });
        }
      }
      if (btn) {
        let menu = this.contant.menu;
        basketArr = addBasketStore.getState().arr;
        basketElem = this.#state.obj;
        btn.addEventListener("click", function () {
          if (menuStore.getState().menu !== "sandwiches") {
            modalFillNameStore.dispatch({ type: "addId", payload: key });
            if (document.getElementById("idBasket" + menu[key].id)) {
              for (let key2 in basketArr.elem) {
                if (basketArr.elem[key2].id === menu[key].id) {
                  basketArr.elem[key2].amount = parseInt(basketArr.elem[key2].amount) + parseInt(menu[key].count);
                  addBasketStore.dispatch({
                    type: "updateCount",
                  });
                }
              }
            } else {
              const product = {
                name: menu[key].name,
                amount: parseInt(menu[key].count),
                id: menu[key].id,
                price: menu[key].price,
              };
              addBasketStore.dispatch({
                type: "addBasket",
                payload: product,
              });
            }
            sum = basketArr.elem.reduce((prev, curr) => prev + curr.price * curr.amount, 0);
            addBasketStore.dispatch({ type: "addSum", payload: sum });
          } else {
            activeModal.dispatch({ type: "active", payload: menu[key] });
            menu[key].result = menu[key].price;
            activeModal.dispatch({
              type: "basketElem",
              payload: menu[key],
            });
            menuStore.dispatch({ type: "sizes" });
          }
        });
      }
    }
  }
}

module.exports = Menu;
