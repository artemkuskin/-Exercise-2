const { menuStore, modalFillNameStore: modalOpen, getMenu, addBasketStore } = require("../../reduxFile/sore");
class ModalComponent {
  root;
  contant;

  #state = {
    menu: "",
    category: "",
    list: [],
    result: {},
    obj: {},
    arr: [],
  };

  set state(newState) {
    this.#state = newState;
    this.render();
  }

  constructor(root, contant) {
    this.contant = contant;
    this.root = root;
    this.render();
    menuStore.subscribe(this.render.bind(this));
    modalOpen.subscribe(() => {
      this.render();
    });
  }

  vegetName() {
    let result = this.#state.result.components.vegetables;
    let html = "";
    for (let key in result) {
      html += `
      <span>${this.contant.menu2[result[key]].name},</span>
      `;
    }
    return html;
  }

  render() {
    this.#state.menu = this.contant.menu2;

    this.#state.category = menuStore.getState().modal;
    this.#state.result = modalOpen.getState().modalBasket;
    const modal = this.#state.menu;
    const result = this.#state.result;
    const basketModal = modalOpen.getState().modalBasket;
    const menu = this.contant.menu2;
    const menu2 = this.contant.menu;
    const basketElem = this.#state.obj;
    let modalElem = modalOpen.getState().modalBasket.components;
    this.root.innerHTML = "";

    for (let key in modal) {
      let img =
        modal[key].category && modal[key].image ? require(`../../../i/${modal[key].category}/${modal[key].image}`) : "";

      if (this.#state.category === modal[key].category && this.#state.category !== "result") {
        let html = "";

        const category = modal[key].category;
        const id = key;

        const isActive = modalElem
          ? Array.isArray(modalElem[category])
            ? modalElem[category].includes(id)
            : modalElem[category] == id
          : false;

        html = `
    <div class="price-popup ${isActive ? "active" : ""}" id="${modal[key].id}">
    <div class="price-boll2">
    <div class="price-boll">
    <img src="${img}"  class="ingredients-small content__ingredients-img" id='img${[key]}'> </div></div>
    <h4 class="name">${modal[key].name}</h4>
    <a href="#" class="item-description">${modal[key].description}  </a>
    <div class="text-block"><p class="price-text"> ${modal[key].price} </p><strong> руб</strong> </div></div>
          `;

        // }
        this.root.innerHTML += html;
      } else if (this.#state.category === "result") {
        let resultImg = result.category && result.image ? require(`../../../i/${result.category}/${result.image}`) : "";
        let html = "";
        html = `<div class="price-popup2">
        <div class="price-boll2">
        <div class="price-boll">
        <img src="${resultImg}"  class="ingredients-small content__ingredients-img"> </div></div>
        <div class="content__ingredients-price-itog">
        <h1 class="title-itog">Ваш сендвич готов</h4>
        <div class='block-side'>
        <p>Размер:<strong id='sizes-name' class='-1'>${
          menu[result.components.sizes] === undefined ? "15см" : menu[result.components.sizes].name
        }</strong></p>
        <p>Хлеб:<strong id='breads-name'  class='-1'>${
          menu[result.components.breads] === undefined ? "Белый итальянский" : menu[result.components.breads].name
        }</strong></p>
        <p>Овощи:<strong id ='veget-name'  class='-1'>${
          this.vegetName().length === 0 ? "Hет" : this.vegetName()
        }</strong></p>
        <p>Соусы:<strong id='sous-name'  class='-1'>${
          menu[result.components.sauces] === undefined ? "Нет" : menu[result.components.sauces].name
        }</strong></p>
        <p>Начинка:<strong id="fill-name"  class="-1">${
          menu[result.components.fillings] === undefined ? "Нет" : menu[result.components.fillings].name
        }</strong></p>
        
        <h3 id="name">${result.name}</h3>
        </div>
        <div class='counter'>
        <button class="increase" id='inc-modal${result.id}'> + </button>
                  <input type="number"  value='${result.count}' class="input" readonly>
                  <button class ="decrease" id='dec-modal${result.id}'> - </button> </div>
        <button class="edit-button-modal" id=${result.id}>В КОРЗИНУ</button></div>
        `;

        this.root.innerHTML = html;
        const btn = document.querySelector(".edit-button-modal");
        const inc = document.querySelector(`#inc-modal${result.id}`);
        const dec = document.querySelector(`#dec-modal${result.id}`);
        if (inc && dec) {
          inc.addEventListener("click", function () {
            if (menuStore.getState().modal === "result") {
              result.count += 1;
              menuStore.dispatch({ type: "updateCount" });
            }
          });
          dec.addEventListener("click", function () {
            if (menuStore.getState().modal === "result") {
              result.count -= 1;
              if (result.count <= 1) {
                result.count = 1;
              }
            }
            menuStore.dispatch({ type: "updateCount" });
          });
        }

        btn.addEventListener("click", function (e) {
          basketElem.name = basketModal.name;
          basketElem.amount = modalOpen.getState().modalBasket.count;
          basketElem.price = basketModal.result;
          basketElem.id = menu2[e.target.id].id;
          basketElem.components = {
            size: menu[basketModal.components.sizes]?.name,
            bread: menu[basketModal.components.breads]?.name,
            sauce: menu[basketModal.components.sauces]?.name,
            filling: menu[basketModal.components.fillings]?.name,
            vegetables: menu[basketModal.components.vegetables]?.name,
          };
          addBasketStore.dispatch({
            type: "addBasket",
            payload: { ...basketElem },
          });
          let basketArr = addBasketStore.getState().arr;
          let sum = basketArr.elem.reduce((prev, curr) => prev + curr.price * curr.amount, 0);
          addBasketStore.dispatch({ type: "addSum", payload: sum });
          modalOpen.dispatch({ type: "close" });
          modalOpen.dispatch({ type: "counter", payload: 0 });
        });
      }
    }

    let resultArr = [];

    for (let key in modal) {
      let imgBtn = document.querySelector(`#img${key}`);

      if (imgBtn) {
        imgBtn.addEventListener("click", function () {
          let basket = modalOpen.getState().modalBasket;
          let price = modalOpen.getState().modalBasket.price;
          let price2 = 0;
          let sum = 0;
          if (modal[key].category === "sizes") {
            if (!basket.components.sizes) {
              basket.components.sizes = key;
            } else {
              basket.components.sizes = "";
            }
          } else if (modal[key].category === "breads") {
            if (!basket.components.breads) {
              basket.components.breads = key;
            } else {
              basket.components.breads = "";
            }
          } else if (modal[key].category === "vegetables") {
            if (basket.components.vegetables.length <= 3) {
              basket.components.vegetables.push(key);
              basket.components.vegetables = Array.from(new Set(basket.components.vegetables));
            } else {
              basket.components.vegetables.splice(0, 1);
            }
          } else if (modal[key].category === "sauces") {
            if (!basket.components.sauces) {
              basket.components.sauces = key;
            } else {
              basket.components.sauces = "";
            }
          } else if (modal[key].category === "fillings") {
            if (!basket.components.fillings) {
              basket.components.fillings = key;
            } else {
              basket.components.fillings = "";
            }
          }
          console.log(modalOpen.getState());
          resultArr = [
            basket.components.sizes,
            basket.components.breads,
            basket.components.sauces,
            basket.components.fillings,
          ];

          let vegetArr = basket.components.vegetables;
          basket.arr = resultArr;
          basket.arrVeget = vegetArr;

          for (let key in modalOpen.getState().modalBasket.arr) {
            if (modalOpen.getState().modalBasket.arr[key]) {
              price2 = +price2 + menu[modalOpen.getState().modalBasket.arr[key]].price;
            }
          }
          sum = price + price2;
          basket.result = sum;
          modalOpen.dispatch({ type: "basketElem", payload: basket });
        });
      }
    }
  }
}
module.exports = ModalComponent;
