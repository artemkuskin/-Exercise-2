let Menu = require('./scripts/menu')
let Catalog = require('./scripts/main')
import "./index.html";
import "./index.scss";

let nenu = new Menu(document.getElementById('container'))
let catalog = new Catalog(document.querySelector('.contant').querySelector('.block'))
    