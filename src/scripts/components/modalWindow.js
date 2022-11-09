let ModalComponent = require('../modalComponents.js')
let FillName = require('./modalFillName')
let BasketModal = require('./basketModal')
let {ResultPrice} = require('../components/modalResiltPrice')

class ModalWindow {
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



  render() {
    // removeEventListener
    this.root.innerHTML = "";
    
    let html = "";
    html = `
       <div class="content__ingredients" href="1">
       <div class="content__ingredients-title">
           <span class="close_modal_window">X</span>
           <h2 class="content__ingredients-title-text">ВЫБЕРИТЕ РАЗМЕР ХЛЕБА</h2>
       </div>
       <div class="categories">

       </div>
       <div class="content__ingredients-button">
           <button class="content__ingredients-button-next">ВПЕРЕД ></button>
           <button class="content__ingredients-button-next-back">НАЗАД</button>
       </div>
       <div id="content__ingredients-price" class="sizes">

       </div>
       <footer>
           <h2 class="footer-text">Итого: руб
           </h2>
       </footer>
   </div>
          `;

    this.root.innerHTML = html;
    new  ModalComponent(document.querySelector('#content__ingredients-price'))
    new FillName(document.querySelector('.categories'))
    new BasketModal()
    new ResultPrice(document.querySelector('.footer-text'))
  }
}

module.exports = ModalWindow;
