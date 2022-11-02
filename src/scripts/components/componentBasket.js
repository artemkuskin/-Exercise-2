
const { applyMiddleware } = require("redux");
const { default: logger } = require("redux-logger");
const { createStore } = require("../reduxFile/redux2");
const { menuReducer, basketReducer } = require("../reduxFile/rootReducer");
let store2 = createStore(basketReducer, []);

let store = createStore(menuReducer);
class ProductBusket {
  root;
  #state = {
    name: "",
    amount: "",
    id: "",
    price: "",
  };

  set state(newState) {
    this.#state = newState;
    this.render();
  }

  constructor(root) {
    this.root = root;
    //   document.addEventListener('click', async function(e) {

    // })

    store2.subscribe(() => {
      const state = store2.getState();
      this.render();
    });
    document.addEventListener("click", this.addComponent.bind(this));
    this.render()
  }

  async addComponent(e) {
    menu = await store.getState();
    basketArr = await store2.getState();
    basketElem = this.#state;

    if (e.target.classList.contains("edit-button")) {
      if (document.getElementById("idBasket" + menu[e.target.id].id)) {
        for (let key in basketArr) {
          if (basketArr[key].id === menu[e.target.id].id) {
            basketArr[key].amount =
              +basketArr[key].amount +
              +document
                .getElementById(`${menu[e.target.id].id}`)
                .querySelector(".input").value;
           
            console.log(store2.getState());
          }
        }
      } else {
        store2.dispatch({ type: "addBasket" });
        basketElem.name = menu[e.target.id].name;
        basketElem.amount = +document
          .getElementById(`${menu[e.target.id].id}`)
          .querySelector(".input").value;
        basketElem.id = menu[e.target.id].id;
        basketElem.price = menu[e.target.id].price;
      }
    }
  }


  async render() {
    let basketArr = await store2.getState();
    let test = { ...this.#state };
    basketArr.push(test);
    this.Sstate = basketArr;

    console.log(basketArr);

    let html = "";
    for (let key in basketArr) {
      html += `
        <p class='product-name' id="idBasket${basketArr[key].id}">${basketArr[key].name} ${basketArr[key].amount}</p>
            `;
            this.root.innerHTML += html;
    }
    
  }
}

module.exports = ProductBusket;
