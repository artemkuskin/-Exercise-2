
class FillName {
    root;
    #state = {
      list: [
        "sizes",
        "breads",
        "vegetables",
        "sauces",
        "fillings",
        "result",
      ],
      selectedCategory: "",
    };
  
    set state(newState) {
      this.#state = newState;
      this.render();
    }
  
    constructor(root) {
      this.root = root;
  
      this.render();
    }
  
    
  
    render() {

        for (category in this.#state.list) {
          
           const html = `
        <a class="categories-link"  id="${
          this.#state.list[category]
        }">${this.#state.list[category]}</a>
            `;
            this.root.innerHTML += html;
        }
        
    }
    
  }
  
  module.exports = FillName;
  