let Menu = require('./scripts/menu')
let Basket = require('./scripts/components/basket')
let Modal = require('./scripts/components/open-modal')
let MainMenu = require('./scripts/components/mainMenu')
let Window = require('./scripts/components/modalWindow')

import "./index.html";
import "./index.scss";


new Modal()
new Window(document.getElementById('fon'))
new MainMenu(document.querySelector('.menu'))
new Menu(document.getElementById('container'))
 new Basket(document.querySelector('.basket'))


