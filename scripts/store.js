const initState = {
  notions: [],
  archive: [],
  trash: [],
};

export let state = { ...initState };

export function applyAction(action, idx) {
  switch (action) {
    case "archiveFromNotions": {
      const [newArr, removedItem] = filterArray(state.notions, idx);
      state.notions = newArr;
      state.archive = [...state.archive, removedItem];
      break;
    }
    case "restoreToNotions": {
      const [newArr, removedItem] = filterArray(state.archive, idx);
      state.archive = newArr;
      state.notions = [...state.notions, removedItem];
      break;
    }
    case "archiveFromTrash": {
      const [newArr, removedItem] = filterArray(state.trash, idx);
      state.trash = newArr;
      state.archive = [...state.archive, removedItem];
      break;
    }
    case "deleteFromNotions": {
      const [newArr, removedItem] = filterArray(state.notions, idx);
      state.notions = newArr;
      state.trash = [...state.trash, removedItem];
      break;
    }
    case "deleteFromArchive": {
      const [newArr, removedItem] = filterArray(state.archive, idx);
      state.archive = newArr;
      state.trash = [...state.trash, removedItem];
      break;
    }
    case "deleteFromTrash": {
      state.trash = state.trash.filter((el, i) => i != idx);
      break;
    }
    case "saveNotion": {
      const inputRef = document.getElementById("data_input");
      const value = inputRef.value.trim();
      if (value !== "") {
        state.notions = [...state.notions, value];
      }
      inputRef.value = "";
      break;
    }
  }
  saveToLocalStorage();
}

export function saveToLocalStorage() {
  localStorage.setItem("state", JSON.stringify(state));
}

export function getFromLocalStorage() {
  const lsState = JSON.parse(localStorage.getItem("state"));
  if (lsState) {
    Object.assign(state, lsState);
  }
}

function filterArray(arr, idx) {
  let removedItem;
  const newArr = arr.filter((el, i) => {
    if (idx == i) {
      removedItem = el;
      return false;
    } else {
      return true;
    }
  });
  return [newArr, removedItem];
}
