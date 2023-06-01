document.querySelectorAll(".content-warning").forEach((warning) => {
  // When the "Show" button is clicked, hide the warning
  warning.querySelector("button").addEventListener("click", () => {
    warning.classList.add("hide");

    // Wait for the fade animation to finish before hiding the warning
    warning.addEventListener("animationend", () => {
      warning.style.display = "none";
    });

    try {
      // When the "Hide content" button is clicked, show the warning
      document.querySelector("#hideBtn").addEventListener("click", () => {
        warning.classList.remove("hide");
        warning.style.display = "flex";
      });
    } catch (error) {
      console.log("content_warning.js: No hide button found");
    }
  });
});
