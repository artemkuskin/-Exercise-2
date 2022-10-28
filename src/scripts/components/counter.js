
class Button {
  root;
  #state = {
    counter: 1,
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
    }

  }

  decrement() {
    this.state = {
      ...this.#state,
      counter: this.#state.counter - 1,
    };
    
  }

  render() {
    // removeEventListener
    this.root.innerHTML = ''
    let html = ''
     html = `
    <button class="increase"> + </button>
    <input type="number" value='${this.#state.counter}' class="input">
    <button class ="decrease"> - </button>
        `;

    this.root.innerHTML = html;
    let inc = this.root.querySelector(".increase"); 
    let dec = this.root.querySelector(".decrease");
  

    if (inc) {
      inc.addEventListener("click", this.increment.bind(this));
    }

    if (dec) {
      dec.addEventListener("click", this.decrement.bind(this));
    }
  }
}

module.exports = Button;
