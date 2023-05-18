function compareInputs() {
  const inputOld = document.querySelector("#input-old").value;
  const inputNew = document.querySelector("#input-new").value;

  if (inputOld === inputNew) {
    document.querySelector("#output").innerHTML = "Inputs are the same";
    return
  }

  let highlightedText = "";

  for (let i = 0; i < inputNew.length; i++) {
    if (inputNew[i] !== inputOld[i]) {
      highlightedText += '<span class="highlight-red">' + inputNew[i] + '</span>';
    } else {
      highlightedText += '<span class="highlight-green">' + inputNew[i] + '</span>';
    }
  }

  // Update output
  document.querySelector("#output").innerHTML = highlightedText;
}

function removeHtmlTags(event) {
  const inputElement = event.target;
  const inputValue = inputElement.value;

  // Remove HTML tags from input value by creating a temporary div
  let div = document.createElement("div");
  div.innerHTML = inputValue;

  // Then the text content of the div is the input value without HTML tags
  const strippedHtml = div.textContent || div.innerText || "";

  // Update the input element with the stripped HTML
  document.querySelector(`#${inputElement.id}`).value = strippedHtml;
}

// Listen for input events on both textareas
["input-old", "input-new"].forEach((id) => {
  document.querySelector(`#${id}`).addEventListener("input", (event) => {
    // Remove HTML tags from input value
    if (stripHtml) removeHtmlTags(event);

    compareInputs();
  })
})