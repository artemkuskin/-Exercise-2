const { createStore } = require("../reduxFile/redux");
const { menuReducer, basketReduser } = require("../reduxFile/rootReducer");
let store2 = createStore(basketReduser, { 
    name: '',
    amount: '',
    id: '',
    price: ''
})

let store = createStore(menuReducer)
class ProductBusket {
    root;
    #state = [];
  
    set state(newState) {
      this.#state = newState;
      this.render();
    }
  
    constructor(root) {
      this.root = root;
      document.addEventListener('click', async function(e) {
        let menu = await store.getState()
        let basket = await store2.getState()
        
        if (e.target.classList.contains('edit-button')) {
           store2.dispatch({type: 'addBusket'})
            
            basket.name = menu[e.target.id].name
            basket.amount = 2
            basket.id = menu[e.target.id].id
            basket.price = menu[e.target.id].price

        }
       
    })
      
      this.render();
      store2.subscribe(this.render.bind(this));
    }
  
   async  render() {

    let menu = await store.getState()
    let basket = await store2.getState()
    let test = {...basket}
    this.#state.push(test)
    // for (let key in this.#state) {
    // this.#state[key].name = basket.name
    // this.#state[key].id = basket.id
    // this.#state[key].price = basket.price
    // this.#state[key].amount = basket.amount
    // }
    
       
        
        


    
  console.log(this.#state);
     
      let html = "";
      for(let key in this.#state) {
      html = `
        <p class='product-name'>${this.#state[key].name} ${this.#state[key].amount}</p>

            `;
      }
      this.root.innerHTML += html;
    }
    
  }
  
  module.exports = ProductBusket;
  