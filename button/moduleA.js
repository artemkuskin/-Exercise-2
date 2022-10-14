const pubSub = require("./pubsub");
module.exports = {
    publishEvent() {
        const data = {
            class: "active",
            class2: "price-popup"
        };
        
        pubSub.publish("modal", data);
    }

    
};

// При изменении какого-то класса я буду записыввать это значние 
//в этот объект и передвать его в другую функцию для того чтобы не хранить данные в дом дереве