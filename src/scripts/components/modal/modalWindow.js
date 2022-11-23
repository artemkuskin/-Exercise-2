const { modalFillNameStore: modalOpen, getMenu, menuStore } = require("../../reduxFile/sore");
let ModalComponent = require("./modalComponents");
let FillName = require("./modalFillName");
let ResultPrice = require("./modalResiltPrice");

class ModalWindow {
  root;
  contant;
  #state = {
    counter: 0,
    list: [],
    sum: 0,
  };

  set state(newState) {
    this.#state = newState;
    this.render();
  }

  constructor(root, contant) {
    this.contant = contant;
    this.root = root;
    this.render();
  }

  render() {
    // console.log(modalFillNameStore.getState());
    console.log("ModalWindow - RENDER");

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
           <h2 class="footer-text">Итого:${this.#state.sum} руб
           </h2>
       </footer>
   </div>
          `;

    this.root.innerHTML = html;
    new ModalComponent(document.querySelector("#content__ingredients-price"), this.contant);
    new FillName(document.querySelector(".categories"));
    new ResultPrice(document.querySelector(".footer-text"), this.contant);
    let closeBtn = document.querySelector(".close_modal_window");
    let style = modalOpen.getState().open;
    let next = document.querySelector(".content__ingredients-button-next");
    let back = document.querySelector(".content__ingredients-button-next-back");

    let menu = this.contant.menu2;

    // count

    closeBtn.addEventListener("click", function () {
      // count
      modalOpen.dispatch({ type: "close" });
      modalOpen.dispatch({ type: "counter", payload: (count = 0) });
      document.getElementById("fon").className = style;
      // document.querySelector(".step").className = "categories-link";
    });

    next.addEventListener("click", function () {
      let count = modalOpen.getState().counter;
      if (count >= 4) {
        count = 4;
      }
      modalOpen.dispatch({ type: "counter", payload: (count += 1) });
      let fillName = modalOpen.getState().fillName;
      menuStore.dispatch({ type: fillName[count] });
      let components = modalOpen.getState().modalBasket.arr;
      if (menuStore.getState().modal !== "vegetables") {
        for (let key in components) {
          if (menu[components[key]]) {
            if (document.getElementById(`${menu[components[key]].id}`)) {
              document.getElementById(`${menu[components[key]].id}`).className = "active";
            }
          }
        }
      } else {
        let arrVeget = modalOpen.getState().modalBasket.arrVeget;
        for (let key in arrVeget) {
          if (menu[arrVeget[key]]) {
            // if(Array.isArray(components[key])) {
            if (document.getElementById(`${menu[arrVeget[key]].id}`)) {
              document.getElementById(`${menu[arrVeget[key]].id}`).className = "active";
            }

            //   }
          }
        }
      }
    });
    back.addEventListener("click", function () {
      let count = modalOpen.getState().counter;
      if (count <= 1) {
        count = 1;
      }
      modalOpen.dispatch({ type: "counter", payload: (count -= 1) });
      let fillName = modalOpen.getState().fillName;
      menuStore.dispatch({ type: fillName[count] });
      let components = modalOpen.getState().modalBasket.arr;
      if (menuStore.getState().modal !== "vegetables") {
        for (let key in components) {
          if (menu[components[key]]) {
            if (document.getElementById(`${menu[components[key]].id}`)) {
              document.getElementById(`${menu[components[key]].id}`).className = "active";
            }
          }
        }
      } else {
        let arrVeget = modalOpen.getState().modalBasket.arrVeget;
        for (let key in arrVeget) {
          if (menu[arrVeget[key]]) {
            // if(Array.isArray(components[key])) {
            if (document.getElementById(`${menu[arrVeget[key]].id}`)) {
              document.getElementById(`${menu[arrVeget[key]].id}`).className = "active";
            }

            //   }
          }
        }
      }
    });
  }
}

module.exports = ModalWindow;
