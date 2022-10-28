let subwayLogo = require("../i/markets/subway_logo.png");
let donerLogo = require("../i/img/doner.png");
let chickenLogo = require("../i/img/south_fried_chicken.png");
let Button = require("./components/counter");
const { createStore } = require("./reduxFile/redux");
const { rootReducer, menuReducer } = require("./reduxFile/rootReducer");
let store = createStore(rootReducer, "pizza");
let menuStore = createStore(menuReducer, {});

class Menu {
  root;

  #state = {
    category: "",
    menu: menuStore.getState(),
  };

  set state(newState) {
    this.#state = newState;

    this.render();
  }

  constructor(root) {
    this.root = root;
    document.addEventListener('click', async function(e) {
      if (e.target.classList.contains('menu-link'))
       store.dispatch({type: e.target.id})
      
   })
  
    this.render();

    store.subscribe(this.render.bind(this));
  }

  async render() {
    console.log(1);
    this.#state.category = store.getState()
    let menu = await menuStore.getState();

    window.store = store;
    this.root.innerHTML = "";

    for (let key in menu) {
      
      let img =
        menu[key].category && menu[key].image
          ? require(`../i/${menu[key].category}/${menu[key].image}`)
          : "";

      let out = "";

      if (menu[key].category === this.#state.category) {
        out += `<div class="products" >`;
        if (menu[key].market === "subway") {
          out += `<img src='${subwayLogo}' class="item-img">`;
        } else if (menu[key].market === "sfc") {
          out += `<img src="${chickenLogo}" class="item-img">`;
        } else if (menu[key].market === "doner") {
          out += `<img src="${donerLogo}" class="item-img">`;
        }
        out += `<div class="price-boll3">
                   <div class="price-boll">
                      <img src="${img} "
                       class="img" id="${"y" + menu[key].id}"> </div></div>
                  <div class="text">
                      <p class="item-text" id="${"b" + menu[key].id}"> ${
          menu[key].name
        }
                      </p> </div>
                       <div class="link"> <a href="#" class="item-link"> ${
                         menu[key].description
                       }</a> </div>
                      <p class="container-text"> Цена <strong class="price-one" id="${
                        "v" + menu[key].id
                      }"> 
                      ${menu[key].price}</strong> руб</p> 
                  <p class="item-link-text">КОЛИЧЕСТВО</p>
                  <div class="counter${+menu[key].id}" id="${
          "123" + menu[key].id
        }">
                  </div>
                  <button class="edit-button" id="${[key]
                  }"> В КОРЗИНУ  </button> 
                 </div>`;
        this.root.innerHTML += out;
      }
    }

    for (let key in menu) {
      if (menu[key].category === this.#state.category) {
        const button = new Button(
          document
            .getElementById("container")
            .querySelector(`.counter${+menu[key].id}`)
        );
      }
    }
  }
}

module.exports = Menu;
// let subwayLogo = require("../i/markets/subway_logo.png");
// let donerLogo = require("../i/img/doner.png");
// let chickenLogo = require("../i/img/south_fried_chicken.png");
// let Button = require("./counter");
// const pubSub = require("./pubsub");
// const { createStore } = require("./redux");
// const { rootReducer, menuReducer } = require("./rootReducer");
// let store  = createStore(rootReducer, 'pizza')
// let menu = createStore(menuReducer, {})

// class Menu {
//   root;

//   #state = {
//     category: store.getState()
//   };

//   set state(newState) {
//     this.#state = newState;

//     this.render();
//   }

//   constructor(root) {
//     this.root = root;

//     this.render();

//     // store.subscribe(this.render.bind(this))
//   }

//   async  render() {
//     console.log(menu.getState());
//     let data = menu.getState()

//     // let button = document.getElementById('sandwiches')
//     //   button.addEventListener('click', async function() {
//     //      store.dispatch({type: 'changeCategory'})
//     //      let categoris = await store.getState()
//     //    return categoris
//     //   })

//     window.store = store
//     this.root.innerHTML =  ''

//       menu.subscribe(() => {
//         for (let key in data) {
// console.log(1);
//         let img =
//           data[key].category && data[key].image
//             ? require(`../i/${data[key].category}/${data[key].image}`)
//             : "";

//         let out = "";

//         if (data[key].category === this.#state.category) {
//           out += '<div class="products" >';
//           if (data[key].market === "subway") {
//             out += `<img src='${subwayLogo}' class="item-img">`;
//           } else if (data[key].market === "sfc") {
//             out += `<img src="${chickenLogo}" class="item-img">`;
//           } else if (data[key].market === "doner") {
//             out += `<img src="${donerLogo}" class="item-img">`;
//           }
//           out += `<div class="price-boll3">
//                    <div class="price-boll">
//                       <img src="${img} "
//                        class="img" id="${"y" + data[key].id}"> </div></div>
//                   <div class="text">
//                       <p class="item-text" id="${"b" + data[key].id}"> ${data[key].name}
//                       </p> </div>
//                        <div class="link"> <a href="#" class="item-link"> ${
//                          data[key].description
//                        }</a> </div>
//                       <p class="container-text"> Цена <strong class="price-one" id="${
//                         "v" + data[key].id
//                       }">
//                       ${data[key].price}</strong> руб</p>
//                   <p class="item-link-text">КОЛИЧЕСТВО</p>
//                   <div class="counter${+data[key].id}" id="${"123" + data[key].id}">
//                   </div>
//                   <button class="edit-button" id=" ${
//                     data[key].id
//                   }"> В КОРЗИНУ  </button>
//                  </div>`;
//           this.root.innerHTML += out;

//         }
//       }

//       })
//       // for (let key in data) {
//       //   if (
//       //     data[key].category === this.#state.category
//       //   ) {
//       //     const button = new Button(
//       //       document.getElementById('container').querySelector(`.counter${+data[key].id}`)
//       //     );
//       //   }

//     }

//   }

// module.exports = Menu;

// //---------------------------------------------------------------------

// // class Menu {
// //   constructor(root) {
// //     this.root = root;

// //     state = {
// //       list: ["pizza", "bugrers"],
// //       selectedCategory: "pizza",
// //     };

// //     this.render();
// //   }

// //   render() {
// //     for (category in this.state.list) {
// //       html += `<span class="menu-item ${
// //         this.state.selectedCategory === category ? "active" : ""
// //       }">${category}</span>`;
// //     }
// //   }
// // }
