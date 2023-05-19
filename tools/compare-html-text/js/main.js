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
