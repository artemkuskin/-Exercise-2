let subwayLogo = require("../i/markets/subway_logo.png");
let donerLogo = require("../i/img/doner.png");
let chickenLogo = require("../i/img/south_fried_chicken.png");
let Button = require("./counter");
class Menu {
  constructor(root) {
    this.root = root;

    state = {
      selectedCategory: 'pizza'
    }

    this.render();
  }

  async render() {
    let url = "http://localhost:7000/";
    let resp = await fetch(`${url}`);
    let result = await resp.json();
    let menu = result.menu;

    let out = "";
    for (let key in menu) {
      if (
        menu[key].category === document.querySelector("#container").className
      ) {
        out += '<div class="products" >';
        if (menu[key].market === "subway") {
          out += `<img src='${subwayLogo}' class="item-img">`;
        } else if (menu[key].market === "sfc") {
          out += `<img src="${chickenLogo}" class="item-img">`;
        } else if (menu[key].market === "doner") {
          out += `<img src="${donerLogo}" class="item-img">`;
        }
        out += `<div class="price-boll3">
                   <div class="price-boll">
                      <img src="${require(`../i/${
                        menu[key].category
                      }/${menu[key].image}`)} "
                       class="img" id="${"y" + menu[key].id}"> </div></div>
                  <div class="text">
                      <p class="item-text" id="${"b" + menu[key].id}"> ${
          menu[key].name
        }
                      </p> </div>
                       <div class="link"> <a href="#" class="item-link"> ${
                         menu[key].description
                       }  </a> </div>
                      <p class="container-text"> Цена <strong class="price-one" id="${
                        "v" + menu[key].id
                      }"> 
                      ${menu[key].price}</strong> руб</p> 
                  <p class="item-link-text">КОЛИЧЕСТВО</p>
                  <div class="counter-${+menu[key].id}">
                  </div>
                  <button class="edit-button" id=" ${
                    menu[key].id
                  }"> В КОРЗИНУ  </button> 
                 </div>`;
      }
    }
    this.root.innerHTML = out;

    for (let key in menu) {
      if (
        menu[key].category === document.querySelector("#container").className
      ) {
        const button = new Button(
          document
            .getElementById("container")
            .querySelector(`.counter-${+menu[key].id}`)
        );
      }
    }
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