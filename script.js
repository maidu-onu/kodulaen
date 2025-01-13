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

//Navigates (scrolls) between HTML object
let pointerFloat = 1;
const scroll = function (target, destination) {
  const hoverElement = document.getElementById(target);
  const destinationElement = document.getElementById(destination);

  hoverElement.addEventListener("click", () => {
    let newScrollY = destinationElement.getBoundingClientRect().top;
    console.log(newScrollY);
    window.scrollTo({ top: newScrollY, behavior: "smooth" });

    pointerFloat ? cssRuleSelector("#pointer", "opacity", 0) : "";
  });
};

const scaleHeader = function () {
  let scaled = 0;
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100 && scaled === 0) {
      cssRuleSelector("#header", "height", `10%`);
      cssRuleSelector("#header", "transition", `all 0.5s ease`);
      cssRuleSelector("#header", "marginLeft", `calc(50vw + 50vh)`);
      scaled = 1;
    }
    if (window.scrollY > 200 && scaled === 0) {
      cssRuleSelector("#header", "transition", `height 0.5s ease`);
      scaled = 1;
    }
    if (window.scrollY < 10 && scaled === 1) {
      cssRuleSelector("#header", "height", `16%`);
      cssRuleSelector("#header", "marginLeft", `calc(50vw + 25vh)`);
      scaled = 0;
    }
  });
};
const homeScroll = function () {
  let stopper = 0;
  window.addEventListener("scroll", function () {
    if (window.scrollY > 400 && stopper === 0) {
      cssRuleSelector("#home", "visibility", "visible");

      stopper = 1;
    }
    if (window.scrollY < 500 && stopper === 1) {
      cssRuleSelector("#home", "visibility", "hidden");

      stopper = 0;
    }
  });
};

const downScroll = function () {
  let stopper = 0;
  window.addEventListener("scroll", function () {
    if (window.scrollY > 800 && stopper === 0) {
      cssRuleSelector("#down", "visibility", "hidden");

      stopper = 1;
    }
    if (window.scrollY < 10 && stopper === 1) {
      cssRuleSelector("#down", "animation", "blink 2.5s infinite");
      cssRuleSelector("#down", "visibility", "visible");

      stopper = 0;
    }
  });
};

const down = function () {
  const down1 = document.getElementById("down");
  down1.addEventListener("click", () => {
    window.scrollTo(0, window.innerHeight + window.scrollY);
  });
};

const resize = function () {
  const setDynamicHeight = () => {
    const viewportHeight = window.innerHeight;
    const content = document.querySelector("#page01");

    //Set height based on viewport height
    content.style.height = `${8 * viewportHeight}px`; // 800vh visible as 1/8th at once
  };

  window.addEventListener("resize", setDynamicHeight);
  setDynamicHeight();
};

async function initialize() {
  try {
    await loadSVG("header", "page01");
    await loadSVG("pointer", "page01");
    await loadSVG("down", "page01");
    await loadSVG("home", "page01");
    await down();
    await loadSVG("main", "page01");
    scroll("header", "taust-00");
    //scroll("down", "taust-01");
    scroll("home", "taust-00");
    scroll("hover", "taust-01");
    scroll("hover-2", "taust-02");
    scroll("hover-3", "taust-03");
    scroll("hover-4", "taust-04");
    scroll("hover-5", "taust-05");
    scroll("hover-6", "taust-06");
    scroll("hover-7", "taust-07");
    scaleHeader();
    homeScroll();
    downScroll();
    resize();

    link("hover-8", "https://www.youtube.com/watch?v=pTUBWFCaGNI");
    link(
      "hover-9",
      "https://vikerraadio.err.ee/1609383949/mihkel-laan-kliimaeesmarkide-sotsiaalmajandusliku-moju-uuring"
    );
    link(
      "hover-10",
      "https://toila.kovtp.ee/documents/1433808/37263301/J%C3%B5hvi-Toila+%C3%BChinemise+anal%C3%BC%C3%BCs%2C%2007.10.2024.pdf/a8087bd3-8438-405c-a71e-312df524894a"
    );

    link(
      "hover-11",
      "https://www.muhu.ee/documents/22617526/24690259/Muhu_arengukava.pdf/311d4a44-6c04-4d2b-982a-63e1b1b9612b"
    );
    link("hover-12", "https://cumulus.ee/kogemus/");
  } catch (error) {
    console.error("Initialization failed:", error);
  }
}

document.addEventListener("DOMContentLoaded", initialize);
