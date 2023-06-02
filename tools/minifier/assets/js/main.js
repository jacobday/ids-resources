function getLanguage(code) {
  const languages = {
    html: /(<html|<!DOCTYPE html>|<!--|-->|<link)/i,
    css: /(\/\*|\*\/|:root|:hover|:focus|:active)/i,
    js: /(function|var|let|const|\/\/|async|\(\))/i,
  };

  for (const language in languages) {
    if (languages[language].test(code)) {
      return language;
    }
  }

  // If no language is found, return null
  return null;
}

function getSizeInBytes(text) {
  return new Blob([text]).size;
}

function getSizeFormatted(sizeInBytes) {
  const kilobyte = 1024;
  const megabyte = kilobyte * 1024;
  const gigabyte = megabyte * 1024;

  if (sizeInBytes >= gigabyte) {
    return (sizeInBytes / gigabyte).toFixed(2) + " GB";
  } else if (sizeInBytes >= megabyte) {
    return (sizeInBytes / megabyte).toFixed(2) + " MB";
  } else if (sizeInBytes >= kilobyte) {
    return (sizeInBytes / kilobyte).toFixed(2) + " KB";
  } else {
    return sizeInBytes + " bytes";
  }
}

function getSizeDifferences(originalSize, minifiedSize) {
  const difference = originalSize - minifiedSize;
  const percentage = ((difference / originalSize) * 100).toFixed(2);

  if (isNaN(percentage)) {
    return "0.00% improvement";
  } else return `${percentage}% improvement`;
}

function minifyCode(code) {
  const language = getLanguage(code);
  let minifiedCode = "";

  // Update language indicator
  document.querySelector("#language").innerHTML = language
    ? language.toUpperCase()
    : "Unknown Language";

  // Remove comments based on language
  if (language === "html" || language === null) {
    minifiedCode = code.replace(/<!--([\s\S]*?)-->/g, "");
  } else if (language === "css") {
    minifiedCode = code.replace(/\/\*([\s\S]*?)\*\//g, "");
  } else if (language === "js") {
    minifiedCode = code
      .replace(/\/\/(.*)/g, "")
      .replace(/\/\*([\s\S]*?)\*\//g, "");
  }

  // Remove whitespace
  minifiedCode = minifiedCode.replace(/\s+/g, " ").trim();
  return minifiedCode;
}

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

document.querySelector("#input").addEventListener("input", (event) => {
  const text = event.target.value;
  const textSize = getSizeInBytes(text);

  // Update input size indicator
  document.querySelector("#inputSize").innerHTML = getSizeFormatted(textSize);

  // Minify code
  const minifiedCode = minifyCode(text);
  const minifiedSize = getSizeInBytes(minifiedCode);

  // Update output
  document.querySelector("#output").value = minifiedCode;

  // Update output size indicator
  document.querySelector("#outputSize").innerHTML = `
    ${getSizeFormatted(minifiedSize)} (${getSizeDifferences(
    textSize,
    minifiedSize
  )})`;
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
