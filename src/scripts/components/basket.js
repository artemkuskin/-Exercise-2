const { createStore } = require("../reduxFile/redux2");
let basketImg = require("./basketImg/basket.png");
const {
  menuReducer,
  basketReducer,
} = require("../reduxFile/rootReducer");
const {menuStore} = require('../reduxFile/sore')
let store2 = createStore(basketReducer, []);
let store = createStore(menuReducer);

class Busket {
  root;
  #state = {};

  set state(newState) {
    this.#state = newState;
    this.#state
  }

  constructor(root) {
    this.root = root;
    store2.subscribe(() => {
      const state = store2.getState();

      this.render();
    });
    document.addEventListener("click", this.addComponent.bind(this));

    document.addEventListener("click", this.deleteElem.bind(this));
    this.render();
  }


  async addComponent(e) {
    menu = await store.getState();
    basketArr = await store2.getState();
    basketElem = this.#state;
    id = e.target.id

    if (
      e.target.classList.contains("edit-button") &&
      menuStore.getState() !== "sandwiches"
    ) {
      if (document.getElementById("idBasket" + menu[id].id)) {
        for (let key in basketArr) {
          if (basketArr[key].id === menu[id].id) {
            basketArr[key].amount =
              parseInt(basketArr[key].amount) +
              parseInt(document
                .getElementById(`${menu[id].id + 1}`)
                .querySelector(".input").value);

            this.text();
          }
        }
      } else {
        store2.dispatch({ type: "addBasket"});
        basketElem.name = menu[id].name;
        basketElem.amount = parseInt(
          document
            .getElementById(`${menu[id].id + 1}`)
            .querySelector(".input").value
        );
        basketElem.id = menu[id].id;
        basketElem.price = menu[id].price;
      }
    }
    
  }

  resultSum() {
    basketArr = store2.getState();
    let sum = 0;
    let html = "";

    for (let key in basketArr) {
      sum += parseInt(basketArr[key].price) * basketArr[key].amount;
    }
    html = `<span class="all-price">Итого:${sum} Руб</span> `;
    document.getElementById("result-sum").innerHTML = html;
    return html;
  }

  deleteElem(e) {
    let basketArr = store2.getState();
    id = e.target.id
    if (e.target.classList.contains("idBasketButton")) {
      document.getElementById("idBasket" + id + "Parent").remove();
      for (let key in basketArr) {
        if (basketArr[key].id === id) basketArr.splice([key], 1);
      }
      console.log(basketArr);
    }
    this.resultSum();
  }

  text() {
    let html = "";
    basketArr = store2.getState();
    for (let key in basketArr) {
      html += ` <div class='basketElem' id='idBasket${basketArr[key].id}Parent'><p class='product-name' id="idBasket${basketArr[key].id}">${basketArr[key].name} - ${basketArr[key].amount}</p>
      <button id="${basketArr[key].id}" class='idBasketButton'>X</button></div>`;
      document.getElementById("counter-text").innerHTML = html;
    }
    return html;
  }

  async render() {
    let basketArr = await store2.getState();
    let test = { ...this.#state };

    if (test.name) {
      basketArr.push(test);
    }

    this.root.innerHTML = "";
    let html = "";

    html = `
       <div class="basket-icon">
                  <img src=${basketImg} alt="" class="icon">
                  <h2 class="basket-title">КОРЗИНА</h2>
              </div>
              <div class="basket-text">
              <div id="tovar">
                      <span class='basket-name'>Название</span><span class='basket-amoun'>Количество</span>      
                      </div>
                  <div>

                      <div id="counter-text"></div>
                  </div>
              </div>
              <p id='result-sum'>Итого:0 Руб</p>
              <button class="basket-button">ОФОРМИТЬ ЗАКАЗ</button>
          `;
    this.root.innerHTML = html;
    this.text();
   
  }
}

module.exports = Busket;

