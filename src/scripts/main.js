

class Catalog {
  root;
  #state = {
   
  };

  set state(newState) {
    this.#state = newState;
    
    this.render();
  }

  constructor(root) {
    this.root = root;
    this.root
      .addEventListener("click",this.increment.bind(this))
    this.render();
  }

  increment(e) {
    // update counter
    // this.#state.counter = this.#state.counter + 1;
    if (e.target.classList.contains('menu-link')) {
    this.state = {

    };
    console.log(this.#state);
  }
  }

  render() {
    // removeEventListener

      
  }

}

module.exports = Catalog






  





