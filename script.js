"use strict";
// SVG-le tuleb lisada width ja height 100%

//fetch SVg
async function loadSVG(fileName) {
  try {
    // Fetch the SVG file
    const response = await fetch(`SVG/${fileName}.svg`);
    // Convert the response to text (SVG content)
    const svgContent = await response.text();
    // Inject the SVG content into the HTML element
    document.body.insertAdjacentHTML(
      "beforeend",
      `<div class="page" id="${fileName}">${svgContent}</div>`
    );
  } catch (error) {
    console.error("Error loading SVG:", error);
  }
}

const cssRuleSelector = function (selector, property, newValue) {
  for (const sheet of document.styleSheets) {
    for (const rule of sheet.cssRules) {
      if (rule.selectorText === selector) {
        rule.style[property] = newValue;
      }
    }
  }
};

const scroll = function (target, destination) {
  const hoverElement = document.getElementById(target);
  const destinationElement = document.getElementById(destination);

  hoverElement.addEventListener("click", () => {
    let newScrollY = destinationElement.getBoundingClientRect().top;
    console.log(newScrollY);
    window.scrollTo({ top: newScrollY, behavior: "smooth" });
  });
};

async function initialize() {
  try {
    await loadSVG("page01");
    scroll("hover", "taust2");
    scroll("hover-3", "taust1");
    scroll("hover-2", "taust2");
  } catch (error) {
    console.error("Initialization failed:", error);
  }
}
initialize();

/* if (hoverElement && taust2Element) {
  hoverElement.addEventListener("click", function () {
    taust2Element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
} else {
  console.error("Elements with IDs 'hover' or 'taust2' not found!");
} */
