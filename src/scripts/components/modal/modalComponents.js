const {
  stepStore,
  getModalMenu,
  menuStore,
  modalFillNameStore,
  getMenu,
  addBasketStore,
} = require("../../reduxFile/sore");
const { addModalBasket } = require("../../reduxFile/sore");
let store = getMenu;
let modalOpan = modalFillNameStore;
class ModalComponent {
  root;
  #state = {
    menu: "",
    category: "",
    list: [],
    result: {},
    obj: {},
  };

  set state(newState) {
    this.#state = newState;
    this.render();
  }

  constructor(root) {
    this.root = root;
    this.addListeners();
    this.render();
    let category = menuStore.getState();
    menuStore.subscribe(this.render.bind(this));
  }

  addListeners() {
    document.addEventListener("click", this.increment.bind(this));
    document.addEventListener("click", this.decrement.bind(this));
    let btn = document.querySelector(".edit-button-modal");
    // if (btn) {

    //   btn.addEventListener('click', this.addBasket.bind(this))
    // }
  }

  async addBasket(e) {
    let basketModal = modalFillNameStore.getState().modalBasket;
    const menu = await getModalMenu.getState();
    let menu2 = await store.getState();
    basketElem = this.#state.obj;
    let id = modalFillNameStore.getState().id;
    if (e.target.classList.contains("edit-button-modal")) {
      // basketElem.name = basketModal.name;
      // basketElem.amount = menu2[id].count;
      // basketElem.price = basketModal.result;
      // basketElem.id = id;
      // basketElem.components = {
      //   size: menu[basketModal.components.sizes]?.name,
      //   bread: menu[basketModal.components.breads]?.name,
      //   sauce: menu[basketModal.components.sauces]?.name,
      //   filling: menu[basketModal.components.fillings]?.name,
      //   vegetable: menu[basketModal.components.vegetables]?.name,
      // };
      // addBasketStore.dispatch({
      //   type: "addBasket",
      //   payload: { ...basketElem },
      // });
      // console.log(1);
    }
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
    let basketModal = modalFillNameStore.getState().modalBasket;
    const menu = await getModalMenu.getState();
    let menu2 = await store.getState();
    let basketElem = this.#state.obj;
    let id = modalFillNameStore.getState().id;

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
        let btn = document.querySelector(".edit-button-modal");
        // let closeBtn = document.querySelector('.close_modal_window')
        btn.addEventListener("click", function () {
          basketElem.name = basketModal.name;
          basketElem.amount = menu2[id].count;
          basketElem.price = basketModal.result;
          basketElem.id = id;
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
          modalOpan.dispatch({ type: "close" });
        });
        btn.addEventListener("click", function () {
          let style = modalOpan.getState().open.style;
          document.getElementById("fon").className = style;
          modalOpan.dispatch({ type: "counter", payload: 0 });
        });
    //     closeBtn.addEventListener('click', function() {
    //       let style = modalOpan.getState().open;
    //       modalOpan.dispatch({ type: "close" });
    //   modalOpan.dispatch({ type: "counter", payload: 0 });
    //   document.getElementById("fon").className = style;
    //  console.log(1);
    //    })
      }
    }
  }
}
module.exports = ModalComponent;
