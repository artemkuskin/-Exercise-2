const { createStore } = require("./reduxFile/redux2");
const { modalReducer, modalRootReducer, modalFillNameReducer } = require("./reduxFile/rootReducer");
let store = createStore(modalReducer);
let {stepStore} = require('./reduxFile/sore')
const {addModalBasket} = require('./reduxFile/sore')
let Counter = require('./components/counter')
class ModalComponent {
  root;
  #state = {
    menu: "",
    category: "",
    list: [],
    result: {}
  };

  set state(newState) {
    this.#state = newState;
    this.render();
  }

  constructor(root) {
    this.root = root;
  
    this.render();
    stepStore.subscribe(this.render.bind(this));
  }

  async render() {
    // removeEventListener

    this.#state.menu = await store.getState();
    this.#state.category = stepStore.getState();
    this.#state.result = addModalBasket.getState()
    let module = this.#state.menu;
    let result = this.#state.result
    this.root.innerHTML = "";
    

    for (let key in module) {
      let img =
        module[key].category && module[key].image
          ? require(`../i/${module[key].category}/${module[key].image}`)
          : "";
          
          
      if (this.#state.category === module[key].category && this.#state.category !== 'result') {
        let html = "";
        
        html = `
    <div class="price-popup" id="${module[key].id}">
    <div class="price-boll2">
    <div class="price-boll">
    <img src="${img}"  class="ingredients-small content__ingredients-img" id=${[
          key,
        ]}> </div></div>
    <h4 class="name">${module[key].name}</h4>
    <a href="#" class="item-description">${module[key].description}  </a>
    <div class="text-block"><p class="price-text"> ${
      module[key].price
    } </p><strong> руб</strong> </div></div>
          `;
  
    this.root.innerHTML += html;

      } else if (this.#state.category === 'result') {
        let resultImg = result.category && result.image 
         ?  require(`../i/${result.category}/${result.image}`) : '';
        let html = "";
        html = `<div class="price-popup2">
        <div class="price-boll2">
        <div class="price-boll">
        <img src="${resultImg}"  class="ingredients-small content__ingredients-img"> </div></div>
        <div class="content__ingredients-price-itog">
        <h1 class="title-itog">Ваш сендвич готов</h4>
        <p>Размер:<strong id='sizes-name' class='-1'>${result.components.size}</strong></p>
        <p>Хлеб:<strong id='breads-name'  class='-1'>${result.components.bread}</strong></p>
        <p>Овощи:<strong id='veget-name'  class='-1'>${result.components.vegetable}</strong></p>
        <p>Соусы:<strong id='sous-name'  class='-1'>${result.components.sauce}</strong></p>
        <p>Начинка:<strong id="fill-name"  class="-1">${result.components.filling}</strong></p>
        <h3 id="name">${result.name}</h3>
        <div class='counter'> </div>
        <button class="edit-button-modal">В КОРЗИНУ</button></div>
        `
        this.root.innerHTML = html;
        new Counter(document.querySelector('.content__ingredients-price-itog').querySelector('.counter'))
      }
  
    
  }
  }
}
module.exports = ModalComponent;
