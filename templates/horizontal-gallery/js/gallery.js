// Resources:
//  - https://alvarotrigo.com/blog/scroll-horizontally-with-mouse-wheel-vanilla-java/
//  - https://codepen.io/MythosM/pen/zYaLeXQ?editors=1010

let scrollBuffer = 0;

// Set gallery container height
function setStickyContainersSize() {
  requestAnimationFrame(function () {
    document.querySelectorAll(".gallery-sticky").forEach(function (container) {
      const stickyElement = container.querySelector(
        ".gallery > div:first-of-type"
      );
      const stickyElementWidth = stickyElement.scrollWidth;
      const stickyElementHeight = stickyElement.offsetHeight;

      const stickyContainerHeight =
        stickyElementHeight > stickyElementWidth
          ? stickyElementHeight +
            container.querySelector(".gallery").scrollWidth
          : container.querySelector(".gallery").scrollWidth +
            container.querySelector(".sticky-inner").offsetHeight -
            container.querySelector(".sticky-inner").scrollWidth +
            scrollBuffer * 2;

      container.setAttribute(
        "style",
        "height: " + stickyContainerHeight + "px"
      );
    });
  });
}

function trackScroll() {
  // Find all the container elements
  const containers = document.querySelectorAll(".gallery-sticky");

  // Create an IntersectionObserver to track the containers
  const observer = new IntersectionObserver((entries) => {
    // Find the first container that is fully in view
    const containerInViewPort = entries.find((entry) => entry.isIntersecting);
    if (!containerInViewPort) return;

    // Get the gallery element and the current scroll position
    const gallery = containerInViewPort.target.querySelector(".gallery");
    const scrollTop = document.documentElement.scrollTop;
    const containerTop = containerInViewPort.target.offsetTop;

    // Scroll the gallery horizontally
    const pxToScroll = scrollTop - containerTop;
    gallery.scrollLeft = pxToScroll;
  });

  // Start observing the containers
  for (const container of containers) {
    observer.observe(container);
  }
}

function initGallery() {
  setStickyContainersSize();

  let galleryObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
          document.addEventListener("scroll", trackScroll);
        } else if (entry.intersectionRatio <= 0.1) {
          document.removeEventListener("scroll", trackScroll);
        }
      });
    },
    { threshold: [0, 0.5] }
  );

  // Observe galleries
  const galleries = document.querySelectorAll(".gallery");
  galleries.forEach((gallery) => {
    galleryObserver.observe(gallery);
  });
}

window.addEventListener("resize", setStickyContainersSize);

initGallery();
