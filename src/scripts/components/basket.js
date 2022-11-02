const { createStore } = require("../reduxFile/redux2");
let basketImg = require("./basketImg/basket.png");
const { menuReducer, basketReducer, rootReducer } = require("../reduxFile/rootReducer");
let store2 = createStore(basketReducer, []);
let store = createStore(menuReducer);
class Busket {
  root;
  #state = {};

  set state(newState) {
    this.#state = newState;
    this.render();
  }

  constructor(root) {
    this.root = root;
    store2.subscribe(() => {
      const state = store2.getState();

      this.render();
    });
    document.addEventListener(
      "click",
      this.addComponent.bind(this),
      this.resultSum(),
    );

    document.addEventListener('click', 
    this.deleteElem.bind(this),
    this.resultSum())
    this.render();
  }

  async addComponent(e) {
    menu = await store.getState();
    basketArr = await store2.getState();
    basketElem = this.#state;

    if (e.target.classList.contains("edit-button") && menu[e.target.id].category !== 'sandwiches') {
      if (document.getElementById("idBasket" + menu[e.target.id].id)) {
        for (let key in basketArr) {
          if (basketArr[key].id === menu[e.target.id].id) {
            basketArr[key].amount =
              +basketArr[key].amount +
              +document
                .getElementById(`${menu[e.target.id].id + 1}`)
                .querySelector(".input").value;
            console.log(basketArr);

            this.text();
          }
        }
      } else {
        store2.dispatch({ type: "addBasket" });
        basketElem.name = menu[e.target.id].name;
        basketElem.amount = parseInt(
          document
            .getElementById(`${menu[e.target.id].id + 1}`)
            .querySelector(".input").value
        );
        basketElem.id = menu[e.target.id].id
        basketElem.price = menu[e.target.id].price;
        console.log(store2.getState());
      }
    }
  }

  resultSum() {
    basketArr = store2.getState();
    let sum = 0;
    for (let key in basketArr) {
      sum += parseInt(basketArr[key].price) * basketArr[key].amount;
    }
    return sum;
  }

  deleteElem (e) {
    let basketArr = store2.getState()
    if (e.target.classList.contains('idBasketButton')) {
      document.getElementById('idBasket' + e.target.id + 'Parent').remove()
      for (let key in basketArr) { 
        if(basketArr[key].id === e.target.id)
       basketArr.splice([key], 1)
      }
      console.log(basketArr);
    }
  }

  text() {
    let html= "";
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
              <p>Итого: <span class="all-price">${this.resultSum()}</span> руб</p>
              <button class="basket-button">ОФОРМИТЬ ЗАКАЗ</button>
          `;
    this.root.innerHTML = html;
    this.text();
  }
}

module.exports = Busket;
