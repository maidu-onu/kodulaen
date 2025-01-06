/* const viewportWidth = Math.floor(window.innerWidth * window.devicePixelRatio);
const viewportHeight = Math.floor(window.innerHeight * window.devicePixelRatio);
const availableWidth = Math.floor(
  window.screen.availWidth * window.devicePixelRatio
);
const availableHeight = Math.floor(
  window.screen.availHeight * window.devicePixelRatio
);

// screen resolution //
window.addEventListener("resize", function () {
  const viewportWidth = Math.floor(window.innerWidth * window.devicePixelRatio);
  const viewportHeight = Math.floor(
    window.innerHeight * window.devicePixelRatio
  );
  const availableWidth = Math.floor(
    window.screen.availWidth * window.devicePixelRatio
  );
  const availableHeight = Math.floor(
    window.screen.availHeight * window.devicePixelRatio
  );

  console.log(`Updated viewport width: ${viewportWidth}px`);
  console.log(`Updated viewport height: ${viewportHeight}px`);
  console.log(`Monitor width: ${availableWidth}px`);
  console.log(`Monitor height: ${availableHeight}px`);

  document.body.style.Height = `${(viewportHeight / availableHeight) * 100}%`;
});

// change body size//
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.Height = `${(viewportHeight / availableHeight) * 100}%`;
}); */
