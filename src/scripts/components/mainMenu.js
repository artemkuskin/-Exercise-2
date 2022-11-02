const { createStore } = require("../reduxFile/redux2");

const { rootReducer } = require("../reduxFile/rootReducer");

let store = createStore(rootReducer, '')

class MainMenu {
  root;
  #state = {
    list: [
      "pizza",
      "burgers",
      "sandwiches",
      "shaurma",
      "chicken",
      "salads",
      "drinks",
    ],
  };

  set state(newState) {
    this.#state = newState;
    this.render();
  }

  constructor(root) {
    this.root = root;

    this.render();
  }

  

  render() {
    // removeEventListener


     
      for (category in this.#state.list) {
        
         const html = `
      <p class="menu-link"  id="${
        this.#state.list[category]
      }">${this.#state.list[category].toUpperCase()}</p>
          `;
          this.root.innerHTML += html;
         
          // const element = document.querySelector('.menu-link').id
          // element.addEventListener('click', () => this.setCategory(category));
        
      }
    
  }
  
}

module.exports = MainMenu;
