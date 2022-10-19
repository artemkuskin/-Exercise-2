let asd = require('../i/sandwiches/beef-club.png')
let qwe = require('../i/markets/subway_logo.png')
let Button = require("./counter");
class Menu {
    root;
    #state = {
      link: '0'
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
        link: 'shaurma',
      };
    }
  

      // removeEventListener
  
      async render() {
        
        let url = "http://localhost:7000/";
        let resp = await fetch(`${url}`);
        let result = await resp.json();
        let menu = result.menu;
        
        
      
        let out = "";
        for (let key in menu) {
             //let img = require(`${menu[key].image}`)
          if (menu[key].category === document.querySelector("#container").className) {
            out += '<div class="products" >';
            if (menu[key].market === "subway") {
              out += `<img src='${qwe}' class="item-img">`;
            } else if (menu[key].market === "sfc") {
              out += `<img src="${qwe}" class="item-img">`;
            } else if (menu[key].market === "doner") {
              out += `<img src="${qwe}" class="item-img">`;
            }
            out += `<div class="price-boll3">
                   <div class="price-boll">
                      <img src="${asd} "
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
                  <button class="edit-button" id=" ${menu[key].id}"> В КОРЗИНУ  </button> 
                 </div>`;
          }
        }
        this.root.innerHTML = out;

        for (let key in menu) {
            const button = new Button(
              document
                .getElementById("container")
                .querySelector(`.counter-${+menu[key].id}`)
            );
          }
          this.root
          .querySelector(".menu-link")
          .addEventListener("click", this.increment.bind(this));
       }
  }
  
  module.exports = Menu;
  





