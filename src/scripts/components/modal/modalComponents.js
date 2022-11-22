const { menuStore, modalFillNameStore, getMenu, addBasketStore } = require("../../reduxFile/sore");
let modalOpan = modalFillNameStore;
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
    this.addListeners();
    this.render();
    menuStore.subscribe(this.render.bind(this));
  }

  addListeners() {
    document.addEventListener("click", this.increment.bind(this));
    document.addEventListener("click", this.decrement.bind(this));
  }

  increment(e) {
    let result = this.#state.result;
    if (e.target.classList.contains("increase")) {
      if (this.#state.category === "result") {
        result.count += 1;
        this.render();
      }
    }
  }

  decrement(e) {
    let result = this.#state.result;
    if (e.target.classList.contains("decrease")) {
      if (this.#state.category === "result") {
        result.count -= 1;
        this.render();
      }
    }
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
    // removeEventListener

    this.#state.menu = this.contant.menu2;
    this.#state.category = menuStore.getState().modal;
    this.#state.result = modalFillNameStore.getState().modalBasket;
    const module = this.#state.menu;
    const result = this.#state.result;
    const basketModal = modalFillNameStore.getState().modalBasket;
    const menu = this.contant.menu2;
    const menu2 = this.contant.menu;
    const basketElem = this.#state.obj;

    this.root.innerHTML = "";

    for (let key in module) {
      let img =
        module[key].category && module[key].image
          ? require(`../../../i/${module[key].category}/${module[key].image}`)
          : "";

      if (this.#state.category === module[key].category && this.#state.category !== "result") {
        let html = "";

        html = `
    <div class="price-popup" id="${module[key].id}">
    <div class="price-boll2">
    <div class="price-boll">
    <img src="${img}"  class="ingredients-small content__ingredients-img" id='img${[key]}'> </div></div>
    <h4 class="name">${module[key].name}</h4>
    <a href="#" class="item-description">${module[key].description}  </a>
    <div class="text-block"><p class="price-text"> ${module[key].price} </p><strong> руб</strong> </div></div>
          `;

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
        <button class="increase" id=${result.id}> + </button>
                  <input type="number"  value='${result.count}' class="input" readonly>
                  <button class ="decrease" id=${result.id}> - </button> </div>
        <button class="edit-button-modal" id=${result.id}>В КОРЗИНУ</button></div>
        `;

        this.root.innerHTML = html;
        let btn = document.querySelector(".edit-button-modal");
        let count = modalFillNameStore.getState().counter;
        btn.addEventListener("click", function (e) {
          basketElem.name = basketModal.name;
          basketElem.amount = menu2[e.target.id].count;
          basketElem.price = basketModal.result;
          basketElem.id = menu2[e.target.id].id;
          basketElem.components = {
            size: menu[basketModal.components.sizes]?.name,
            bread: menu[basketModal.components.breads]?.name,
            sauce: menu[basketModal.components.sauces]?.name,
            filling: menu[basketModal.components.fillings]?.name,
            vegetable: menu[basketModal.components.vegetables]?.name,
          };
          addBasketStore.dispatch({
            type: "addBasket",
            payload: { ...basketElem },
          });
          let basketArr = addBasketStore.getState().arr;
          let sum = basketArr.elem.reduce((prev, curr) => prev + curr.price * curr.amount, 0);

          addBasketStore.dispatch({ type: "addSum", payload: sum });
          modalOpan.dispatch({ type: "close" });
          document.querySelector(".step").className = "categories-link";
          //document.getElementById('sizes').className = 'step'
        });
      }
    }

    let arr = [];
    let resultArr = [];

    for (let key in module) {
      let imgBtn = document.querySelector(`#img${key}`);

      if (imgBtn) {
        imgBtn.addEventListener("click", function () {
          let basket = modalFillNameStore.getState().modalBasket;
          if (module[key].category !== "vegetables") {
            if (!document.querySelector(".active")) {
              document.getElementById(module[key].id).className = "active";
            } else if (document.querySelector(".active")) {
              document.querySelector(".active").className = "price-popup";
              document.getElementById(module[key].id).className = "active";
            }
          } else {
            document.getElementById(module[key].id).className = "active";
          }
          if (module[key].category === "sizes") {
            basket.components.sizes = key;
          } else if (module[key].category === "breads") {
            basket.components.breads = key;
          } else if (module[key].category === "vegetables") {
            arr.push(key);
            basket.components.vegetables = Array.from(new Set(arr));
          } else if (module[key].category === "sauces") {
            basket.components.sauces = key;
          } else if (module[key].category === "fillings") {
            basket.components.fillings = key;
          }
          console.log(modalFillNameStore.getState());
          resultArr = [
            basket.components.sizes,
            basket.components.breads,
            basket.components.sauces,
            basket.components.fillings,
          ];

          let vegetArr = basket.components.vegetables;
          basket.arr = resultArr;
          basket.arrVeget = vegetArr;

          let price = modalFillNameStore.getState().modalBasket.price;
          let price2 = 0;
          let sum = 0;
          for (let key in modalFillNameStore.getState().modalBasket.arr) {
            if (modalFillNameStore.getState().modalBasket.arr[key]) {
              price2 = +price2 + menu[modalFillNameStore.getState().modalBasket.arr[key]].price;
            }
          }
          sum = price + price2;
          basket.result = sum;
          console.log(sum);
          modalFillNameStore.dispatch({ type: "basketElem", payload: basket });
        });
      }
    }
  }
}
module.exports = ModalComponent;
