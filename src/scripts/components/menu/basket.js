const basketImg = require("../../../i/basketImg/basket.png");
const { addBasketStore } = require("../../reduxFile/sore");

class Busket {
  root;
  contant;
  #state = {};
  obj = {};
  sum = 0;

  set state(newState) {
    this.#state = newState;
    this.#state;
  }

  constructor(root, contant) {
    this.contant = contant;
    this.root = root;

    addBasketStore.subscribe(this.render.bind(this));

    this.render();
  }

  resultSum() {
    basketArr = addBasketStore.getState().arr.elem;
    console.log(basketArr, "arr");
    let html = "";
    this.sum = 0;
    for (let key in basketArr) {
      this.sum += parseInt(basketArr[key].price) * basketArr[key].amount;
    }
    console.log(this.sum);
    html = `<span class="all-price">Итого:${this.sum} Руб</span> `;
    document.getElementById("result-sum").innerHTML = html;
    return html;
  }

  basketElem() {
    let html = "";
    basketArr = addBasketStore.getState().arr;
    for (let key in basketArr.elem) {
      html += ` <div class='basketElem' id='idBasket${basketArr.elem[key].id}Parent'><p class='product-name' id="idBasket${basketArr.elem[key].id}">${basketArr.elem[key].name} - ${basketArr.elem[key].amount}</p>
      <button id="idBasketButton${basketArr.elem[key].id}" class='idBasketButton'>X</button></div>`;
      document.getElementById("counter-text").innerHTML = html;
    }
    return html;
  }

  render() {
    const basketArr = addBasketStore.getState().arr;
    let sum = addBasketStore.getState().sum;
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
        <p id='result-sum'>Итого:${sum} Руб</p>
        <button class="basket-button">ОФОРМИТЬ ЗАКАЗ</button>
`;
    this.root.innerHTML = html;
    this.basketElem();
    for (let key in basketArr.elem) {
      let deleteBtm = document.querySelector(`#idBasketButton${basketArr.elem[key].id}`);
      let id = basketArr.elem[key].id;
      deleteBtm.addEventListener("click", function () {
        document.getElementById("idBasket" + id + "Parent").remove();
        if (basketArr.elem[key].id) {
          addBasketStore.dispatch({ type: "deleteElem", payload: key });
          let sum = basketArr.elem.reduce((prev, curr) => prev + curr.price * curr.amount, 0);
          addBasketStore.dispatch({ type: "addSum", payload: sum });
        }
      });
    }
  }
}

module.exports = Busket;
