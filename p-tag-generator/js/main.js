const defaultSettings = {
  sectionBreakAlias: "***",
  sectionBreakHtml: '<p class="section-break">•••</p>',
  applyDropCaps: true,
  saveInput: false,
};

let sectionBreakAlias = defaultSettings.sectionBreakAlias;
let sectionBreakHtml = defaultSettings.sectionBreakHtml;
let applyDropCaps = defaultSettings.applyDropCaps;
let saveInput = defaultSettings.saveInput;

function generateTags() {
  const inputValue = document.querySelector("#input").value;
  const paragraphs = inputValue.split("\n");

  let result = "";
  let isPrevSectionBreak = false;
  paragraphs.forEach((paragraph, index) => {
    const paragraphText = paragraph.trim();
    if (paragraphText === "") {
      // Ignore empty strings
      return;
    } else if (paragraphText === sectionBreakAlias) {
      // Add section break
      result += sectionBreakHtml;
      isPrevSectionBreak = true;
    } else {
      // Add p tag
      if (applyDropCaps && (index == 0 || isPrevSectionBreak)) {
        result += `<p class="dropcap">${paragraphText}</p>`;
      } else {
        result += `<p>${paragraphText}</p>`;
      }
      isPrevSectionBreak = false;
    }

    // Add new line
    result += "\n\n";
  });

  document.querySelector("#output").innerHTML = result.trim();
}

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
  checkbox.classList.add(`${applyDropCaps ? "checked" : "unchecked"}`);

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

function toggleCheckbox(event, checkboxEl) {
  if (event.target.checked) {
    checkboxEl.classList.replace("unchecked", "checked");
    applyDropCaps = true;
  } else {
    checkboxEl.classList.replace("checked", "unchecked");
    applyDropCaps = false;
  }

  // Regenerate tags
  generateTags();
}

function saveSettings() {
  const settings = {
    sectionBreakAlias,
    sectionBreakHtml,
    applyDropCaps,
    saveInput,
  };

  localStorage.setItem("ptag-settings", JSON.stringify(settings));
}

function loadSettings() {
  let settings = localStorage.getItem("ptag-settings");
  settings = JSON.parse(settings);

  if (!settings) {
    saveSettings();
    return;
  }

  sectionBreakAlias = settings.sectionBreakAlias;
  document.querySelector("#aliasInput").value = sectionBreakAlias;

  sectionBreakHtml = settings.sectionBreakHtml;
  document.querySelector("#sectionInput").value = sectionBreakHtml;

  applyDropCaps = settings.applyDropCaps;
  document.querySelector("#checkDropCaps").checked = applyDropCaps;

  const dropCapsCheckbox = document.querySelector(
    '[for="checkDropCaps"] .checkbox'
  );

  if (applyDropCaps) {
    dropCapsCheckbox.classList.replace("unchecked", "checked");
  } else {
    dropCapsCheckbox.classList.replace("checked", "unchecked");
  }

  saveInput = settings.saveInput;
}

function resetSettings() {
  // Reset section break alias
  sectionBreakAlias = defaultSettings.sectionBreakAlias;

  // Reset alias UI
  document.querySelector("#aliasInput").value = sectionBreakAlias;
  document.querySelector(
    "[for='sectionHtml']"
  ).innerHTML = `Replace <i>${sectionBreakAlias}</i> with:`;

  // Reset section break HTML
  sectionBreakHtml = defaultSettings.sectionBreakHtml;

  // Reset HTML UI
  document.querySelector("#sectionInput").value = sectionBreakHtml;

  // Reset drop caps
  applyDropCaps = defaultSettings.applyDropCaps;

  // Reset drop caps UI
  document.querySelector("#checkDropCaps").checked = applyDropCaps;

  const dropCapsCheckbox = document.querySelector(
    '[for="checkDropCaps"] .checkbox'
  );

  if (applyDropCaps) {
    dropCapsCheckbox.classList.replace("unchecked", "checked");
  } else {
    dropCapsCheckbox.classList.replace("checked", "unchecked");
  }

  // Regenerate tags
  generateTags();

  // Save default settings
  saveSettings();
}

document.querySelector("#input").addEventListener("input", generateTags);

document.querySelector("#aliasInput").addEventListener("input", (event) => {
  sectionBreakAlias = event.target.value.trim();

  document.querySelector(
    "[for='sectionHtml']"
  ).innerHTML = `Replace <i>${sectionBreakAlias}</i> with:`;

  generateTags();
});

document.querySelector("#sectionInput").addEventListener("input", (event) => {
  sectionBreakHtml = event.target.value.trim();

  generateTags();
});

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
  checkbox.checked = applyDropCaps;
  createCheckbox(checkbox);
});

document.querySelector(".reset").addEventListener("click", resetSettings);

function init() {
  loadSettings();
  generateTags();
}

init();
