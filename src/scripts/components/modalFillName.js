
const { createStore } = require("../reduxFile/redux2");
const { modalFillNameReducer } = require("../reduxFile/rootReducer");

const store = createStore(modalFillNameReducer, [])
let {stepStore} = require('../reduxFile/sore')

class FillName {
    root;
    #state = {
      list: [],
      count: 0,
      
    };
  
    set state(newState) {
      this.#state = newState;
      this.render();
    }
  
    constructor(root) {
      this.root = root;
      store.dispatch({type: 'fillName'})
      this.#state.list = store.getState()
      let count = this.#state.count;
      let asd = this.#state.list;

      document.addEventListener("click", function (e) {
        if (e.target.classList.contains("content__ingredients-button-next")) {
          if (count === asd.length - 1) {
            stepStore.dispatch({ type: asd[count] });
          } else {
            count++;
            stepStore.dispatch({ type: asd[count] });
          }
        } else if (
          e.target.classList.contains("content__ingredients-button-next-back")
        ) {
          if (count === 0) {
            stepStore.dispatch({ type: asd[count] });
          } else {
            count--;
            stepStore.dispatch({ type: asd[count] });
          }
        }
        
      });
      this.render();
    }
  
    render() {

        for (category in this.#state.list) {
          
           const html = `
        <a class="categories-link"  id="${
          this.#state.list[category]
        }">${this.#state.list[category]}</a>
            `;
            this.root.innerHTML += html;
        }   
    }  
  }
  
  module.exports = FillName;
  