const pubSub = require("./pubsub");
let subscription;

subscription = pubSub.subscribe("menu", data => {
 

  subscription.unsubscribe();
});