const BUTTON_CONFIG = {
  notions: [
    {
      name: "notions",
      content: "To Archive",
      action: "archiveFromNotions",
      className: "btn",
    },
    {
      name: "notions",
      content: "To Trash",
      action: "deleteFromNotions",
      className: "btn",
    },
  ],
  archive: [
    {
      name: "archive",
      content: "To Notions",
      action: "restoreToNotions",
      className: "btn",
    },
    {
      name: "archive",
      content: "To Trash",
      action: "deleteFromArchive",
      className: "btn",
    },
  ],
  trash: [
    {
      name: "trash",
      content: "To Archive",
      action: "archiveFromTrash",
      className: "btn",
    },
    {
      name: "trash",
      content: "Delete Forever",
      action: "deleteFromTrash",
      className: "btn",
    },
  ],
};

function generateNotionTemplate(item, idx, buttons) {
  return /*html*/ `
    <div class="notion-wrapper">
      <p>${item}</p>
      <button data-idx="${idx}" data-name="${buttons[0].name}" data-action="${buttons[0].action}" class="${buttons[0].className}">${buttons[0].content}</button>
      <button data-idx="${idx}" data-name="${buttons[1].name}" data-action="${buttons[1].action}" class="${buttons[1].className}">${buttons[1].content}</button>
    </div>
  `;
}

export function renderTemplate(key, items) {
  const container = document.getElementById(key);
  if (!items.length) {
    container.innerHTML = `<p>No items in ${key}</p>`;
    return;
  }
  const buttons = BUTTON_CONFIG[key];
  container.innerHTML = items
    .map((item, idx) => generateNotionTemplate(item, idx, buttons))
    .join("");
}
