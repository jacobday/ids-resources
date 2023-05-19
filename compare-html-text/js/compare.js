function compareInputs() {
  const inputHtml = removeHtmlTags(document.querySelector("#input-html").value);
  const inputText = document.querySelector("#input-text").value;

  // Calculate differences using the diff_match_patch library
  // https://github.com/google/diff-match-patch
  let differences = diff_match_patch.prototype.diff_main(inputHtml, inputText);

  // Highlight deletions, insertions, and matches
  let highlightedText = "";

  differences.forEach((difference) => {
    let diffText = escapeString(difference[1]);

    if (difference[0] === -1) {
      highlightedText += '<span class="highlight-red">' + diffText + "</span>";
    } else if (difference[0] === 1) {
      highlightedText +=
        '<span class="highlight-green">' + diffText + "</span>";
    } else {
      highlightedText += diffText;
    }
  });

  // Update output
  document.querySelector("#output").innerHTML = highlightedText;
}

function escapeString(str) {
  const escapeMap = {
    // "\\": "\\\\", // Backslash
    // "'": "\\'", // Single quote
    // '"': '\\"', // Double quote
    // "\b": "\\b", // Backspace
    // "\f": "\\f", // Form feed
    "\n": "<br>", // Newline
    // "\r": "\\r", // Carriage return
    // "\t": "\\t", // Tab
    // "\v": "\\v", // Vertical tab
  };

  // Replace each escape character with its escaped version
  // return str.replace(/[\\'\b\f\n\r\t\v]/g, (match) => escapeMap[match]);
  return str.replace(/[\n]/g, (match) => escapeMap[match]);
}

function removeHtmlTags(inputText) {
  // Remove HTML tags from input value by creating a temporary div
  let div = document.createElement("div");
  div.innerHTML = inputText;

  // Then the text content of the div is the input value without HTML tags
  let strippedHtml = div.textContent || div.innerText || "";

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
