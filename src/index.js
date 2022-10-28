let Menu = require('./scripts/menu')
let Basket = require('./scripts/components/basket')

let MainMenu = require('./scripts/components/mainMenu')

import "./index.html";
import "./index.scss";


new MainMenu(document.querySelector('.menu'))
new Menu(document.getElementById('container'))
 new Basket(document.querySelector('.basket'))


