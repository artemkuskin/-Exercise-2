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
  };

  set state(newState) {
    this.#state = newState;

    this.render();
  }

  constructor(root, contant) {
    this.contant = contant;
    this.root = root;
    this.addListeners();
    this.render();
    menuStore.subscribe(this.render.bind(this), (this.#state.category = menuStore.getState().menu));
  }

  addListeners() {
    document.addEventListener("click", this.increment.bind(this));
    document.addEventListener("click", this.decrement.bind(this));
  }

  increment(e) {
    const menu = this.contant.menu;
    if (e.target.classList.contains("increase")) {
      menu[e.target.id].count += 1;
      this.render();
    }
  }

  decrement(e) {
    const menu = this.contant.menu;
    if (e.target.classList.contains("decrease")) {
      menu[e.target.id].count -= 1;

      this.render();
    }
  }

  render() {
    this.#state.category = menuStore.getState().menu;
    const menu = this.contant.menu;
    console.log(this.contant, ">>>>>>>");
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
      let count = modalFillNameStore.getState().counter;
      let sum
      if (btn) {
        let menu = this.contant.menu;
        basketArr = addBasketStore.getState().arr;
        basketElem = this.#state.obj;
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
            sum = basketArr.elem.reduce((prev, curr) => prev + curr.price * curr.amount, 0);
            addBasketStore.dispatch({type: 'addSum', payload: sum})
            console.log(basketArr);
          } else {
            activeModal.dispatch({ type: "active", payload: menu[key] });
            menu[key].result = menu[key].price
            activeModal.dispatch({
              type: "basketElem",
              payload: menu[key],
            });
            modalFillNameStore.dispatch({ type: "counter", payload: (count = 0) });
            menuStore.dispatch({ type: "sizes" });
          }
        });
      }
    }
  }
}

module.exports = Menu;
