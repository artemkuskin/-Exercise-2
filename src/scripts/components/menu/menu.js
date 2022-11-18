const subwayLogo = require("../../../i/img/subway.png");
const donerLogo = require("../../../i/img/doner.png");
const chickenLogo = require("../../../i/img/south_fried_chicken.png");
const { menuStore, getMenu, stepStore, idStore, modalFillNameStore, addBasketStore } = require("../../reduxFile/sore");
const pubsub = require("../../pubSub/pubsub");
const menuStore2 = getMenu;
let activeModal = modalFillNameStore;

class Menu {
  root;

  #state = {
    category: "",
    menu: "",
    amount: 1,
    obj: {},
  };

  set state(newState) {
    this.#state = newState;

    this.render();
  }

  constructor(root) {
    this.root = root;
    this.addListeners();
    this.render();
    let category = menuStore.getState().menu;
    menuStore.subscribe(this.render.bind(this));
  }

  addListeners() {
    document.addEventListener("click", this.increment.bind(this));
    document.addEventListener("click", this.decrement.bind(this));

    // btn.addEventListener('click', function () {
    //   console.log(menu[]);
    // })

    // перебираем все продукты (product-* btn), на каждом на кнопку вешаем листенер, который будет в пейлоаде слать инфу о продукте

    // (product-0Button).addEventListener('click', () => {
    //   setSelectedProductInStore({ id: product.id });

    //   // OR

    //   pubsub.emit('addProductToBasket', { id: product.id })
    // })
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
    this.#state.category = menuStore.getState().menu;
    const menu = await menuStore2.getState();
    // let style = activeModal.getState().open;
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
                  <button class="increase" id='${key}'> + </button>
                  <input type="number"  value='${menu[key].count}' class="input" readonly>
                  <button class ="decrease" id='${key}'> - </button>
                  
                  </div>
                  <button class="edit-button" id="button${[key]}"> В КОРЗИНУ  </button> 
                 </div>`;
        this.root.innerHTML += out;
      }
    }
    for (let key in menu) {
      let btn = this.root.querySelector(`#button${key}`);
      if (btn) {
        let menu = await menuStore2.getState();
        basketArr = addBasketStore.getState();
        basketElem = this.#state.obj;
        let style = activeModal.getState().open;

        //id = idStore.getState();
        let id = modalFillNameStore.getState().id;

        btn.addEventListener("click", async function () {
          
          if (menuStore.getState().menu !== "sandwiches") {
            modalFillNameStore.dispatch({ type: "addId", payload: key });
            console.log(id);
            if (document.getElementById("idBasket" + menu[key].id)) {
              for (let key2 in basketArr.elem) {
                if (basketArr.elem[key2].id === menu[key].id) {
                  basketArr.elem[key2].amount = parseInt(basketArr.elem[key2].amount) + parseInt(menu[key].count);
                  console.log(basketArr);
                  //this.text();
                  addBasketStore.dispatch({
                    type: "asd",
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
            console.log(basketArr);
          } else {
            activeModal.dispatch({ type: "active", payload: menu[key] });
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
