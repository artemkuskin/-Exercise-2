const { modalFillNameStore, getMenu, menuStore } = require("../../reduxFile/sore");
let ModalComponent = require("./modalComponents");
let FillName = require("./modalFillName");
let { ResultPrice } = require("./modalResiltPrice");
let modalOpan = modalFillNameStore;
const menuStore2 = getMenu;

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
    modalFillNameStore.subscribe( async()  => {
      let activeModal = modalFillNameStore
      console.log(activeModal.getState().open);
      let style = activeModal.getState().open;
      document.getElementById("fon").className = style
            if (document.querySelector(".step")) {
              document.querySelector(".step").className = "categories-link";
            }
            document.getElementById(menuStore.getState().modal).className = "step";
    })

    // document.getElementById("fon").className = style;
   // // activeModal.dispatch({
   ////   type: "basketElem",
   // //   payload: payload,
    // });
    // menuStore.dispatch({ type: "sizes" });
    // if (document.querySelector(".step")) {
    //   document.querySelector(".step").className = "categories-link";
    // }
    // document.getElementById(menuStore.getState().modal).className = "step";
  }

  render() {
    // removeEventListener
    this.root.innerHTML = "";

    let html = "";
    html = `
       <div class="content__ingredients" href="1">
       <div class="content__ingredients-title">
           <span class="close_modal_window">X</span>
           <h2 class="content__ingredients-title-text">СОБЕРИТЕ СВОЙ СЕНДВИЧ</h2>
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
    new ModalComponent(document.querySelector("#content__ingredients-price"));
    new FillName(document.querySelector(".categories"));
    new ResultPrice(document.querySelector(".footer-text"));
    let closeBtn = document.querySelector(".close_modal_window");
    let style = modalOpan.getState().open;
    closeBtn.addEventListener("click", function () {
      modalOpan.dispatch({ type: "close" });
      modalOpan.dispatch({ type: "counter", payload: 0 });
      document.getElementById("fon").className = style;
    });
  }
}

module.exports = ModalWindow;
