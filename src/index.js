let Menu = require("./scripts/components/menu/menu");
let Basket = require("./scripts/components/menu/basket");
let MainMenu = require("./scripts/components/menu/mainMenu");
let Window = require("./scripts/components/modal/modalWindow");

import { burgerMenu } from "./api/burgerMenu";
import "./index.html";
import "./index.scss";
import publish from "./scripts/pubSub/publish";

import "./scripts/reduxFile/sore";
const getMenu = async (burgerMenu) => {
  let contant = await burgerMenu();
  new Window(document.getElementById("fon"), contant);
  new Menu(document.getElementById("container"), contant);
  new Basket(document.querySelector(".basket"), contant);
};
new MainMenu(document.querySelector(".menu"));
publish.publishEvent();

getMenu(burgerMenu);
// catch
// api.getProducts -> store.setProducts;
