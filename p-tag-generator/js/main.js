let sectionBreakAlias = "***";
let sectionBreakHtml = `<div class="section-break"></div>`;

function generateTags() {
  const inputValue = document.querySelector("#input").value;
  const paragraphs = inputValue.split("\n");

  let result = "";
  paragraphs.forEach((paragraph) => {
    const paragraphText = paragraph.trim();
    if (paragraphText === "") {
      // Ignore empty strings
      return;
    } else if (paragraphText === sectionBreakAlias) {
      // Add section break
      result += sectionBreakHtml;
    } else {
      // Add p tag
      result += `<p>${paragraphText}</p>`;
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

document.querySelector("#closeBtn").addEventListener("click", () => {
  document.querySelector(".settings-container").style.display = "none";
});

document.querySelector("#openBtn").addEventListener("click", () => {
  document.querySelector(".settings-container").style.display = "flex";
});

document
  .querySelector(".settings-container")
  .addEventListener("click", (event) => {
    if (event.target.classList.contains("settings-container")) {
      document.querySelector(".settings-container").style.display = "none";
    }
  });

function init() {
  sectionBreakAlias = document.querySelector("#aliasInput").value.trim();
  sectionBreakHtml = document.querySelector("#sectionInput").value.trim();

  generateTags();
}

init();
