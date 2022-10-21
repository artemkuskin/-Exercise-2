const pubSub = require("./pubsub");
module.exports = {
  async publishEvent() {
        let url = "http://localhost:7000/";
        let resp = await fetch(`${url}`);
        let result = await resp.json();
        let menu = result.menu;
        for (let key in menu) {
        const data = {
            market: menu[key].market,
            category: menu[key].category,
            img: menu[key].image,
            id: menu[key].id,
            name: menu[key].name,
            discription: menu[key].description,
            price: menu[key].price,
            key: menu[key]
        };
     
        
        pubSub.publish("menu", data);
    }
    }

    
};