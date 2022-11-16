const pubSub = require("./pubsub");
module.exports = {
   publishEvent() {
        
        const data = {
           active: 'active',
           noActive: 'price-popup'
        };


      pubSub.publish("active", data);
    
    }


}