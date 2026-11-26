const demo = document.querySelector(".demo");
const controls = demo.querySelector(".demo-controls");
const selection = demo.querySelector(".selection");
const output = demo.querySelector("output");
const buttons = Array.from(controls.querySelectorAll("button:not(.reset)"));
const reset = controls.querySelector(".reset");
const names = ["左上", "右上", "左下", "右下"];
const path = [];

function draw() {
  let left = 0;
  let top = 0;
  let size = 100;
  for (const index of path) {
    size /= 2;
    if (index % 2 === 1) left += size;
    if (index >= 2) top += size;
  }
  selection.style.left = left + "%";
  selection.style.top = top + "%";
  selection.style.width = selection.style.height = size + "%";
  selection.dataset.depth = String(path.length);
  const done = path.length === 3;
  for (const button of buttons) button.disabled = done;
  reset.disabled = path.length === 0;
  output.textContent = path.length ? path.map(index => names[index]).join(" → ") : "画面全体";
  if (done) reset.focus();
}

function selectRegion(index) {
  if (path.length >= 3) return;
  path.push(index);
  draw();
}

buttons.forEach((button, index) => button.addEventListener("click", () => selectRegion(index)));
reset.addEventListener("click", () => {
  path.length = 0;
  draw();
  buttons[0].focus();
});
controls.addEventListener("keydown", event => {
  if (event.altKey || event.ctrlKey || event.metaKey) return;
  const index = buttons.findIndex(button => button.textContent === event.key.toUpperCase());
  if (index < 0) return;
  event.preventDefault();
  if (!event.repeat) selectRegion(index);
});
controls.hidden = false;
demo.querySelector(".demo-instruction").hidden = false;
draw();
