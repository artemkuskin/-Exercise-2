//const { createStore } = require("./reduxFile/redux2");
const { createStore, applyMiddleware } = require("redux");
const { default: logger } = require("redux-logger");
const { modalReducer, modalRootReducer } = require("./reduxFile/rootReducer");

let store = createStore(modalReducer)
let stepStore = createStore(modalRootReducer, 'sizes', applyMiddleware(logger))
class ModalComponent {
  root;
  #state = {
    menu: '',
    category: ''
  };

  set state(newState) {
    this.#state = newState;
    this.render();
  }

  constructor(root) {
    this.root = root;
    document.addEventListener('click',  function(e) {
      if (e.target.classList.contains('categories-link')) {
       stepStore.dispatch({type: e.target.id})
      }
   })
   
    this.render();
    stepStore.subscribe(this.render.bind(this));
  }



 async render() {
    // removeEventListener
  this.#state.menu = await store.getState()
  this.#state.category = stepStore.getState()
  let module = this.#state.menu
  this.root.innerHTML = "";

  for (let key in module) {

  let img =
  module[key].category && module[key].image
    ? require(`../i/${module[key].category}/${module[key].image}`)
    : "";

        if (this.#state.category === module[key].category) {

    let html = "";
    html = `
    <div class="price-popup" id="${module[key].id}">
    <div class="price-boll2">
    <div class="price-boll">
    <img src="${img}"  class="ingredients-small content__ingredients-img" id=${[key]}> </div></div>
    <h4 class="name" id=" + n + module[key].id +" >${module[key].name}</h4>
    <a href="#" class="item-description">${module[key].description}  </a>
    <div class="text-block"><p class="price-text" id="module[key].id "> ${module[key].price} </p><strong> руб</strong> </div></div>
          `;

    this.root.innerHTML += html;
        }
    }
  }
}
module.exports = ModalComponent;
