// export function createStore(rootReducer, initialState) {
//   let state = rootReducer(initialState, { type: "_INT_" });
//   const subscrubers = [];

//   return {
//     dispatch(action) {
//       state = rootReducer(state, action);
//       subscrubers.forEach((sub) => sub());
//     },
//     subscribe(callback) {
//       subscrubers.push(callback);
//     },
//     getState() {
//       return state;
//     },
//   };
// }

