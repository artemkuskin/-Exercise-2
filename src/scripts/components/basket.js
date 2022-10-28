const { createStore } = require('../reduxFile/redux');
const { menuReducer } = require('../reduxFile/rootReducer');
let basketImg = require('./basketImg/basket.png')
let ProductBusket = require('./componentBasket')
let store = createStore(menuReducer)
class Busket {
  root;
  #state = {
    basket: '',
  };

  set state(newState) {
    this.#state = newState;
    this.render();
  }

  constructor(root) {
    this.root = root;

    this.render();
  }

 async  render() {


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
                      
                      <div id="counter-text">${this.#state.basket}</div>
                  </div>
              </div>
              <p>Итого: <span class="all-price">0</span> руб</p>
              <button class="basket-button">ОФОРМИТЬ ЗАКАЗ</button>
          `;

    this.root.innerHTML = html;
        const product = new ProductBusket(document.getElementById('tovar'))
  }
}

module.exports = Busket;
