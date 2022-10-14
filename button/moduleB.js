const pubSub = require("./pubsub");
let subscription;

subscription = pubSub.subscribe("modal", data => {
  console.log(`ClassName.${data.class}`);
  console.log(`ClassName.${data.class2}`);
  subscription.unsubscribe();
});