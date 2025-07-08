"use strict";
// SVG-le tuleb lisada width ja height 100%

//fetch SVg

async function loadSVG(fileName, destination = "body") {
  try {
    // Fetch the SVG file
    const response = await fetch(`${fileName}.svg`);

    // Convert the response to text (SVG content)
    const svgContent = await response.text();

    // Create a temporary container for the SVG content
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = svgContent;

    // Get the first SVG element from the loaded content
    const svgElement = tempDiv.querySelector("svg");

    if (fileName === "main" && svgElement) {
      // Set preserveAspectRatio attribute if fileName is 'main'
      svgElement.setAttribute("preserveAspectRatio", "xMidYMin meet");
      svgElement.setAttribute("id", "main");
    }

    // Insert the modified SVG content into the specified destination
    document
      .getElementById(destination)
      .insertAdjacentHTML("beforeend", tempDiv.innerHTML);
  } catch (error) {
    console.error("Error loading SVG:", error);
  }
}

//Changes  CSS values
const cssRuleSelector = function (selector, property, newValue) {
  for (const sheet of document.styleSheets) {
    for (const rule of sheet.cssRules) {
      if (rule.selectorText === selector) {
        rule.style[property] = newValue;
      }
    }
  }
};

const link = function (target, destination) {
  const hoverElement = document.getElementById(target);
  hoverElement.addEventListener("click", function () {
    window.open(destination, "_blank");
  });
};

const resize = function () {
  const setDynamicHeight = () => {
    const viewportHeight = window.innerHeight;
    const content = document.querySelector("#page01");

    //Set height based on viewport height
    content.style.height = `${viewportHeight}px`; // 800vh visible as 1/8th at once
  };

  window.addEventListener("resize", setDynamicHeight);
  setDynamicHeight();
};

const uuenda = function () {
  let pross;
  pross =
    ((360 -
      (2053 - new Date().getFullYear()) * 12 +
      2 -
      new Date().getMonth()) /
      360) *
    100;
  const protsent = document.querySelector("#protsent tspan");
  protsent.classList.add("paremale");
  protsent.textContent = `${pross.toFixed(2)} %`;
  const pulk = document.querySelector("#pulk");
  pross = 10;
  pulk.style.transform = `scaleX(${pross / 100})`;
  document.querySelector("#pulk rect").classList.add("paremale");
  if (pross > 99.99) protsent.textContent = `Kõik on`;
  function valueToColor(value) {
    value = Math.max(0, Math.min(100, value)); // clamp to [0, 100]

    let r,
      g,
      b = 0;

    if (value <= 50) {
      // Red (255,0,0) to Orange (255,165,0)
      const t = value / 50;
      r = 255;
      g = Math.round(165 * t);
    } else {
      // Orange (255,165,0) to Green (0,128,0)
      const t = (value - 50) / 50;
      r = Math.round(255 * (1 - t));
      g = Math.round(165 + (128 - 165) * t);
    }
    return `rgb(${r}, ${g}, ${b})`;
  }

  cssRuleSelector(".paremale", "fill", `${valueToColor(pross)}`);
};

async function initialize() {
  try {
    await loadSVG("main", "page01");
    scroll("header", "taust-00");
    await resize();
    await uuenda();
  } catch (error) {
    console.error("Initialization failed:", error);
  }
}

document.addEventListener("DOMContentLoaded", initialize);
