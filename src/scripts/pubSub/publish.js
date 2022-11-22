const { burgerMenu } = require("../../api/burgerMenu");
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
          menu: burgerMenu()
         }


      pubSub.publish("category", data);
    
    }
   

}