import { createStore } from '../reduxFile/redux2';
import { modalReducer } from '../reduxFile/rootReducer';

const {addModalBasket} = require('../reduxFile/sore')
const {menuStore} = require('../reduxFile/sore')
let store = createStore(modalReducer);

export class ResultPrice {
    root;
    #state = {
      counter: 0,
      result: 0
    };
  
    set state(newState) {
      this.#state = newState;
      this.render();
    }
  
    constructor(root) {
      this.root = root;
        document.addEventListener('click', this.Price.bind(this))
        document.addEventListener('click', this.resultSum.bind(this))
  
      this.render();
    }
  Price(e) {
    
    if (e.target.classList.contains('edit-button') && menuStore.getState() === 'sandwiches') {
        this.#state.counter = addModalBasket.getState()
        this.render()
    }
  }

 async resultSum (e) {
      let menu = await store.getState()
      let asd = this.#state.counter
    if (e.target.classList.contains('ingredients-small')) {
        
         for(let key in asd.components ) {
           // this.#state.result = menu[asd.components[key]].price
           if (menu[asd.components[key]]) {
            console.log(menu[asd.components[key]].price);
            this.#state.counter.price += menu[asd.components[key]].price
           }
         }
    }
    this.render()
  }
   
  
    render() {
      // removeEventListener
      this.root.innerHTML = ''
      let html = ''
       html = `
       <strong id="itog-price">Итого: ${this.#state.counter.price} руб</strong>
          `;
          this.root.innerHTML = html;
     
    }
  }
  