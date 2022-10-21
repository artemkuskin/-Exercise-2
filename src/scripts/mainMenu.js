class MainMenu {
    root;
    #state = {
      counter: 0,
    };
  
    set state(newState) {
      this.#state = newState;
      this.render();
    }
  
    constructor(root) {
      this.root = root;
  
      this.render();
    }
  
    increment() {
      // update counter
      // this.#state.counter = this.#state.counter + 1;
  
      this.state = {
        ...this.#state,
        counter: this.#state.counter + 1,
      };
    }
  

  
    render() {
      // removeEventListener
  
      const html = `
      <p class="menu-link" id="pizza" href="#">ПИЦЦА</p>
      <p class="menu-link" id="shaurma" href="#">ШАРУРМА</p>
      <p class="menu-link" id="sandwiches" href="#">СЕНДВИЧИ</p>
      <p class="menu-link" id="burgers" href="#">БУРГЕРЫ</p>
      <p class="menu-link" id="chicken" href="#">КУРИЦА & КАРТОФЕЛЬ</p>
      <p class="menu-link" id="salads" href="#">ТОРТИЛЬЯ & САЛАТЫ</p>
      <p class="menu-link" id="drinks" href="#">НАПИТКИ & ДЕСЕРТЫ</p>
          `;
  
      this.root.innerHTML = html;
  
     
    }
  }
  
  module.exports = MainMenu;
  