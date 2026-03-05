import { applyAction, state, getFromLocalStorage } from "./store.js";
import { renderTemplate } from "./templates.js";

document.addEventListener("DOMContentLoaded", () => {
  init();
  document.querySelector(".save-notion").addEventListener("click", () => {
    handleAction("saveNotion");
  });
  document
    .querySelector(".content-wrapper")
    .addEventListener("click", (event) => {
      const btn = event.target.closest(".btn");

      if (btn) {
        const { idx, action } = btn.dataset;
        applyAction(action, idx);
        render(); // Перерисовываем после экшена
      }
    });
});

function init() {
  getFromLocalStorage();
  render();
}

function handleAction(action, idx) {
  applyAction(action, idx);
  render();
}

function render() {
  for (const key in state) {
    renderTemplate(key, state[key]);
  }
}
