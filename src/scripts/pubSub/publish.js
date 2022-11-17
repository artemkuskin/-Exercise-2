const pubSub = require("./pubsub");
module.exports = {
   publishEvent() {
        
        const data = {
        categoryMenu : [
            "pizza",
            "burgers",
            "sandwiches",
            "shaurma",
            "chicken",
            "salads",
            "drinks",
          ],
         }


      pubSub.publish("category", data);
    
    }
   

}