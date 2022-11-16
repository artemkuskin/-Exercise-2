let Menu = require('./scripts/components/menu/menu')
let Basket = require('./scripts/components/menu/basket')
let Modal = require('./scripts/components/modal/openModal')
let MainMenu = require('./scripts/components/menu/mainMenu')
let Window = require('./scripts/components/modal/modalWindow')

import "./index.html";
import "./index.scss";




new Modal()
new Window(document.getElementById('fon'))
new MainMenu(document.querySelector('.menu'))
new Menu(document.getElementById('container'))
new Basket(document.querySelector('.basket'))

