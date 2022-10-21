class Button {
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

  decrement() {
    this.state = {
      ...this.#state,
      counter: this.#state.counter - 1,
    };
    
  }

  render() {
    // removeEventListener

    const html = `
    <button class="increase"> + </button>
    <input type="number" value='${this.#state.counter}' class="input" id="${
      "a" + "menu[key].id "
    }">
    <button class ="decrease"> - </button>
        `;

    this.root.innerHTML = html;
    let inc = document.querySelector(".increase");
    let dec = document.querySelector(".decrease");
  

    if (inc) {
      inc.addEventListener("click", this.increment.bind(this));
      console.log(12);
    }

    if (dec) {
      dec.addEventListener("click", this.decrement.bind(this));
    }
  }
}

module.exports = Button;
