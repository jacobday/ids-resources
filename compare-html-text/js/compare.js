function compareInputs() {
  const inputHtml = removeHtmlTags(document.querySelector("#input-html").value);
  const inputText = document.querySelector("#input-text").value;

  if (inputHtml === inputText) {
    document.querySelector("#output").innerHTML = "Inputs are the same";
    return;
  }

  let highlightedText = "";

  for (let i = 0; i < inputText.length; i++) {
    if (inputText[i] !== inputHtml[i]) {
      highlightedText +=
        '<span class="highlight-red">' + inputText[i] + "</span>";
    } else if (inputText[i] == inputHtml[i]) {
      highlightedText +=
        '<span class="highlight-green">' + inputText[i] + "</span>";
    } else {
      highlightedText += inputText[i];
    }
  }

  // Update output
  document.querySelector("#output").innerHTML = highlightedText;
}

function removeHtmlTags(inputText) {
  // Remove HTML tags from input value by creating a temporary div
  let div = document.createElement("div");
  div.innerHTML = inputText;

  // Then the text content of the div is the input value without HTML tags
  const strippedHtml = div.textContent || div.innerText || "";

  return strippedHtml;
}

// Listen for input events on both textareas
["input-html", "input-text"].forEach((id) => {
  document.querySelector(`#${id}`).addEventListener("input", () => {
    compareInputs();
  });
});

function init() {
  compareInputs();
}

init();
