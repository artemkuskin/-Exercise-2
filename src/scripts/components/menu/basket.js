const basketImg = require("../../../i/basketImg/basket.png");
const { menuStore, addModalBasket, addBasketStore, getMenu, getModalMenu } = require("../../reduxFile/sore");
const store = getMenu;

class Busket {
  root;
  #state = {};
  obj = {};
  sum = 0;

  set state(newState) {
    this.#state = newState;
    this.#state;
  }

  constructor(root) {
    this.root = root;
    addBasketStore.subscribe(this.render.bind(this));

    this.render();
    this.addListeners();
  }

  addListeners() {
    document.addEventListener("click", this.addComponent.bind(this));
    document.addEventListener("click", this.deleteElem.bind(this));
    document.addEventListener("click", this.addBasket.bind(this));
  }

  async addComponent(e) {
    menu = await store.getState();
    basketArr = addBasketStore.getState();
    basketElem = this.#state;
    id = e.target.id;

    if (e.target.classList.contains("edit-button") && menuStore.getState() !== "sandwiches") {
      if (document.getElementById("idBasket" + menu[id].id)) {
        for (let key in basketArr.elem) {
          if (basketArr.elem[key].id === menu[id].id) {
            basketArr.elem[key].amount = parseInt(basketArr.elem[key].amount) + parseInt(menu[id].count);

            this.text();
          }
        }
      } else {
        basketElem.name = menu[id].name;
        basketElem.amount = parseInt(menu[id].count);
        basketElem.id = menu[id].id;
        basketElem.price = menu[id].price;
        addBasketStore.dispatch({
          type: "addBasket",
          payload: { ...basketElem },
        });
      }
      this.resultSum();
    }
  }

  async addBasket(e) {
    let basketModal = addModalBasket.getState();
    const menu = await getModalMenu.getState();
    let menu2 = await store.getState();
    basketElem = this.#state;
    if (e.target.classList.contains("edit-button-modal")) {
      (basketElem.name = basketModal.name),
        (basketElem.amount = menu2[e.target.id].count),
        (basketElem.price = basketModal.result),
        basketElem.id = e.target.id,
        (basketElem.components = {
          size: menu[basketModal.components.size]?.name,
          bread: menu[basketModal.components.bread]?.name,
          sauce: menu[basketModal.components.sauce]?.name,
          filling: menu[basketModal.components.filling]?.name,
          vegetable: menu[basketModal.components.vegetable]?.name,
        });
      addBasketStore.dispatch({
        type: "addBasket",
        payload: { ...basketElem },
      });
      this.render();
      this.resultSum();
    }
  }

  resultSum() {
    basketArr = addBasketStore.getState().elem;
    console.log(basketArr, "arr");
    let html = "";
    this.sum = 0;
    for (let key in basketArr) {
      this.sum += parseInt(basketArr[key].price) * basketArr[key].amount;
    }

    html = `<span class="all-price">Итого:${this.sum} Руб</span> `;
    document.getElementById("result-sum").innerHTML = html;
    return html;
  }

  deleteElem(e) {
    const basketArr = addBasketStore.getState().elem;
    id = e.target.id;
    if (e.target.classList.contains("idBasketButton")) {
      document.getElementById("idBasket" + id + "Parent").remove();
      for (let key in basketArr) {
        if (basketArr[key].id === id) basketArr.splice([key], 1);
      }
      console.log(basketArr);
      this.resultSum();
    }
  }

  text() {
    let html = "";
    basketArr = addBasketStore.getState();
    for (let key in basketArr.elem) {
      html += ` <div class='basketElem' id='idBasket${basketArr.elem[key].id}Parent'><p class='product-name' id="idBasket${basketArr.elem[key].id}">${basketArr.elem[key].name} - ${basketArr.elem[key].amount}</p>
      <button id="${basketArr.elem[key].id}" class='idBasketButton'>X</button></div>`;
      document.getElementById("counter-text").innerHTML = html;
    }
    return html;
  }

  render() {
    const basketArr = addBasketStore.getState();
    console.log(basketArr);
    this.root.innerHTML = "";
    let html = "";

    html = /*html*/ `
      <div class="basket-icon">
        <img src=${basketImg} alt="" class="icon">
        <h2 class="basket-title">КОРЗИНА</h2>
      </div>
      <div class="basket-text">
        <div id="tovar">
          <span class='basket-name'>Название</span><span
          class='basket-amoun'>Количество</span>
        </div>
          <div>

            <div id="counter-text"></div>
          </div>
        </div>
        <p id='result-sum'>Итого:${this.sum} Руб</p>
        <button class="basket-button">ОФОРМИТЬ ЗАКАЗ</button>
`;
    this.root.innerHTML = html;
    this.text();
  }
}

module.exports = Busket;
