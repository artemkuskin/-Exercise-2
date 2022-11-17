const { stepStore, getModalMenu, menuStore, modalFillNameStore } = require("../../reduxFile/sore");
const { addModalBasket } = require("../../reduxFile/sore");
class ModalComponent {
  root;
  #state = {
    menu: "",
    category: "",
    list: [],
    result: {},
  };

  set state(newState) {
    this.#state = newState;
    this.render();
  }

  constructor(root) {
    this.root = root;
    this.addListeners();
    this.render();
    let category = menuStore.getState()
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

  async render() {
    // removeEventListener

    this.#state.menu = await getModalMenu.getState();
    this.#state.category = menuStore.getState().modal;
    this.#state.result = modalFillNameStore.getState().modalBasket;
    let modalMenu = await getModalMenu.getState();
    let module = this.#state.menu;
    let result = this.#state.result;
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
    <img src="${img}"  class="ingredients-small content__ingredients-img" id=${[key]}> </div></div>
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
        <p>Размер:<strong id='sizes-name' class='-1'>${
          modalMenu[result.components.sizes] === undefined ? "15см" : modalMenu[result.components.sizes].name
        }</strong></p>
        <p>Хлеб:<strong id='breads-name'  class='-1'>${
          modalMenu[result.components.breads] === undefined
            ? "Белый итальянский"
            : modalMenu[result.components.breads].name
        }</strong></p>
        <p>Овощи:<strong id='veget-name'  class='-1'>${
          modalMenu[result.components.vegetables] === undefined ? "Нет" : modalMenu[result.components.vegetables].name
        }</strong></p>
        <p>Соусы:<strong id='sous-name'  class='-1'>${
          modalMenu[result.components.sauces] === undefined ? "Нет" : modalMenu[result.components.sauces].name
        }</strong></p>
        <p>Начинка:<strong id="fill-name"  class="-1">${
          modalMenu[result.components.fillings] === undefined ? "Нет" : modalMenu[result.components.fillings].name
        }</strong></p>
        
        <h3 id="name">${result.name}</h3>
        <div class='counter'>
        <button class="increase" id=${result.id}> + </button>
                  <input type="number"  value='${result.count}' class="input" readonly>
                  <button class ="decrease" id=${result.id}> - </button> </div>
        <button class="edit-button-modal" id=${result.id}>В КОРЗИНУ</button></div>
        `;
        this.root.innerHTML = html;
      }
    }
  }
}
module.exports = ModalComponent;
