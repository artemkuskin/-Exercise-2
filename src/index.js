let Menu = require('./scripts/menu')

const pubSub = require("./scripts/pubsub");
let MainMenu = require('./scripts/mainMenu')
let publish = require('./scripts/publish')
let sub = require('./scripts/subscribers')
import "./index.html";
import "./index.scss";
let maunMenu = new MainMenu(document.querySelector('.menu'))
let menu = new Menu(document.getElementById('container'))


publish.publishEvent()
