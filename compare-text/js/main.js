const defaultSettings = {
  stripHtml: false,
  saveInput: false,
};

let stripHtml = defaultSettings.stripHtml;
let saveInput = defaultSettings.saveInput;


// Writes the given text to the clipboard
// & updates copy button to show the text has been copied
async function copyContent(text, targetNode) {
  try {
    await navigator.clipboard.writeText(text);

    // Update copy button text
    targetNode.innerHTML = "Copied";

    setTimeout(() => {
      targetNode.innerHTML = "Copy";
    }, 2000);
  } catch (err) {
    console.error("Failed to copy: ", err);

    // Update copy button
    const buttonColor = targetNode.style.backgroundColor;
    targetNode.innerHTML = "Error";
    targetNode.style.backgroundColor = "#A93539";

    setTimeout(() => {
      targetNode.innerHTML = "Copy";
      targetNode.style.backgroundColor = buttonColor;
    }, 4000);
  }
}

// Replace native checkbox with custom checkbox
function createCheckbox(checkboxEl) {
  if (!checkboxEl) {
    return;
  }

  const checkboxLabel = checkboxEl.parentElement;

  // Checkbox
  const checkbox = document.createElement("div");
  checkbox.classList.add("checkbox");
  checkbox.classList.add(`${stripHtml ? "checked" : "unchecked"}`);

  // Checkbox Switch
  const checkboxSwitch = document.createElement("span");
  checkboxSwitch.classList.add("checkbox-switch");

  checkbox.appendChild(checkboxSwitch);
  checkboxLabel.appendChild(checkbox);

  checkboxEl.classList.add("hide");

  // Listen for click
  checkboxEl.addEventListener("change", (event) => {
    toggleCheckbox(event, checkbox);
  });
}

// Toggles given checkbox element
function toggleCheckbox(event, checkboxEl) {
  if (event.target.checked) {
    checkboxEl.classList.replace("unchecked", "checked");
    stripHtml = true;
  } else {
    checkboxEl.classList.replace("checked", "unchecked");
    stripHtml = false;
  }

  // Regenerate tags
  // generateTags();
}

// Saves the current settings to local storage
function saveSettings() {
  const settings = {
    stripHtml,
    saveInput,
  };

  localStorage.setItem("compare-settings", JSON.stringify(settings));
}

// Loads the saved settings from local storage
function loadSettings() {
  let settings = localStorage.getItem("compare-settings");
  settings = JSON.parse(settings);

  if (!settings) {
    saveSettings();
    return;
  }

  stripHtml = settings.stripHtml;
  document.querySelector("#checkStripHtml").checked = stripHtml;

  const stripHtmlCheckbox = document.querySelector(
    '[for="checkStripHtml"] .checkbox'
  );

  if (stripHtml) {
    stripHtmlCheckbox.classList.replace("unchecked", "checked");
  } else {
    stripHtmlCheckbox.classList.replace("checked", "unchecked");
  }

  saveInput = settings.saveInput;
}

// Reset current settings to default
function resetSettings() {
  // Reset section break alias
  sectionBreakAlias = defaultSettings.sectionBreakAlias;

  // Reset drop caps
  stripHtml = defaultSettings.stripHtml;

  // Reset drop caps UI
  document.querySelector("#checkStripHtml").checked = stripHtml;

  const stripHtmlCheckbox = document.querySelector(
    '[for="checkStripHtml"] .checkbox'
  );

  if (stripHtml) {
    stripHtmlCheckbox.classList.replace("unchecked", "checked");
  } else {
    stripHtmlCheckbox.classList.replace("checked", "unchecked");
  }

  // Save default settings
  saveSettings();
}

document.querySelectorAll(".copy-button").forEach((button) => {
  button.addEventListener("click", (event) => {
    const text = event.target.parentElement.querySelector("textarea").value;

    // Copy text to clipboard
    copyContent(text, event.target);
  });
});

document.querySelector("#output").addEventListener("click", (event) => {
  const text = event.target.value;

  // Copy text to clipboard
  copyContent(text, event.target.parentElement.querySelector("button"));
});


// Settings Menu
document.querySelector("#closeBtn").addEventListener("click", () => {
  document.querySelector(".settings-container").style.display = "none";

  // Save settings on close
  saveSettings();
});

document.querySelector("#openBtn").addEventListener("click", () => {
  document.querySelector(".settings-container").style.display = "flex";
});

document
  .querySelector(".settings-container")
  .addEventListener("click", (event) => {
    if (event.target.classList.contains("settings-container")) {
      document.querySelector(".settings-container").style.display = "none";

      // Save settings on close
      saveSettings();
    }
  });

// Initialize Checkboxes
document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
  checkbox.checked = stripHtml;
  createCheckbox(checkbox);
});

document.querySelector(".reset").addEventListener("click", resetSettings);

function init() {
  loadSettings();
}

init();
