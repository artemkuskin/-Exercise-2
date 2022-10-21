let subwayLogo = require("../i/markets/subway_logo.png");
let donerLogo = require("../i/img/doner.png");
let chickenLogo = require("../i/img/south_fried_chicken.png");
let Button = require("./counter");
const pubSub = require("./pubsub");
class Menu {
  root;
  #state = {
    selectedCategory: "sandwiches",
  };

  set state(newState) {
    this.#state = newState;
    this.render();
  }

  constructor(root) {
    this.root = root;

    this.render();
  }

  async render() {
    let out = "";
    subscription = pubSub.subscribe("menu", (data) => {
      let img = require(`../i/${data.category}/${data.img}`);

      if (data.category === this.#state.selectedCategory) {
        out += '<div class="products" >';
        if (data.market === "subway") {
          out += `<img src='${subwayLogo}' class="item-img">`;
        } else if (data.market === "sfc") {
          out += `<img src="${chickenLogo}" class="item-img">`;
        } else if (data.market === "doner") {
          out += `<img src="${donerLogo}" class="item-img">`;
        }
        out += `<div class="price-boll3">
                   <div class="price-boll">
                      <img src="${img} "
                       class="img" id="${"y" + data.id}"> </div></div>
                  <div class="text">
                      <p class="item-text" id="${"b" + data.id}"> ${data.name}
                      </p> </div>
                       <div class="link"> <a href="#" class="item-link"> ${
                         data.discription
                       }</a> </div>
                      <p class="container-text"> Цена <strong class="price-one" id="${
                        "v" + data.id
                      }"> 
                      ${data.price}</strong> руб</p> 
                  <p class="item-link-text">КОЛИЧЕСТВО</p>
                  <div class="counter" id="${"123" + data.id}">
                  </div>
                  <button class="edit-button" id=" ${
                    data.id
                  }"> В КОРЗИНУ  </button> 
                 </div>`;
        this.root.innerHTML = out;

        const button = new Button(
          document.getElementById(`${"123" + data.id}`)
        );
      }

      console.log(data);
    });

    // for (let key in menu) {
    //   if (
    //     menu[key].category === document.querySelector("#container").className
    //   ) {
    //     const button = new Button(
    //       document
    //         .getElementById("container")
    //         .querySelector(`.counter-${+menu[key].id}`)
    //     );
    //   }
    // }
  }
}

module.exports = Menu;

// class Menu {
//   constructor(root) {
//     this.root = root;

//     state = {
//       list: ["pizza", "bugrers"],
//       selectedCategory: "pizza",
//     };

//     this.render();
//   }

//   render() {
//     for (category in this.state.list) {
//       html += `<span class="menu-item ${
//         this.state.selectedCategory === category ? "active" : ""
//       }">${category}</span>`;
//     }
//   }
// }
