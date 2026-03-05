const initState = {
  notions: [],
  archive: [],
  trash: [],
};

export let state = { ...initState };

export function applyAction(action, idx) {
  switch (action) {
    case "archiveFromNotions": {
      const [item] = state.notions.splice(idx, 1);
      state.archive.push(item);
      break;
    }
    case "restoreToNotions": {
      const [item] = state.archive.splice(idx, 1);
      state.notions.push(item);
      break;
    }
    case "archiveFromTrash": {
      const [item] = state.trash.splice(idx, 1);
      state.archive.push(item);
      break;
    }
    case "deleteFromNotions": {
      const [item] = state.notions.splice(idx, 1);
      state.trash.push(item);
      break;
    }
    case "deleteFromArchive": {
      const [item] = state.archive.splice(idx, 1);
      state.trash.push(item);
      break;
    }
    case "deleteFromTrash": {
      state.trash.splice(idx, 1);
      break;
    }
    case "saveNotion": {
      const inputRef = document.getElementById("data_input");
      const value = inputRef.value.trim();
      if (value !== "") {
        state.notions.push(value);
      }
      inputRef.value = "";
      break;
    }
  }
  saveToLocalStorage();
}

export function saveToLocalStorage() {
  localStorage.setItem("notizblock_state", JSON.stringify(state));
}

export function getFromLocalStorage() {
  const lsState = JSON.parse(localStorage.getItem("notizblock_state"));
  if (lsState) {
    Object.assign(state, lsState);
  }
}
