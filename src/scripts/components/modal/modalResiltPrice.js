const { modalFillNameStore } = require("../../reduxFile/sore");

class ResultPrice {
  root;
  contant;
  Sstate = {
    castomSandwichObj: 0,
    arr: [],
    basket: {},
    arrBasket: [],
  };

  set state(newState) {
    this.Sstate = newState;
    this.render();
  }

  constructor(root, contant) {
    this.contant = contant;
    this.root = root;
    modalFillNameStore.subscribe(this.render.bind(this));
    this.render();
  }



  render() {
    const price = modalFillNameStore.getState().modalBasket.result;
    let activeModal = modalFillNameStore;
    let style = activeModal.getState().open;
    document.getElementById("fon").className = style;
   
  

    // removeEventListener
    this.root.innerHTML = "";
    let html = "";
    html = `
    <strong id="itog-price">Итого: ${price} руб</strong>
    `;
    this.root.innerHTML = html;
  }
}

module.exports = ResultPrice;
