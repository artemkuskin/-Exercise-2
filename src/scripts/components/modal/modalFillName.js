const { modalFillNameStore } = require("../../reduxFile/sore");

class FillName {
  root;

  constructor(root) {
    this.root = root;
    modalFillNameStore.subscribe(() => {
      this.render();
    });
    this.render();
  }

  render() {
    const state = modalFillNameStore.getState();
    const { counter, fillName } = state;

    this.root.innerHTML = "";

    for (const categoryId in fillName) {
      const category = fillName[categoryId];

      const html = `
        <a class="categories-link ${categoryId == counter ? "step" : ""}"  id="${category}">${category}</a>
            `;
      this.root.innerHTML += html;
    }
  }
}

module.exports = FillName;
