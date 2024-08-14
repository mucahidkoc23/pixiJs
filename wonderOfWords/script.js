import { Application, Assets } from "../node_modules/pixi.js/dist/pixi.mjs";
import { addBackground } from "./addBackground.js";
import { addButton } from "./addButton.js";
import { addRect } from "./addRect.js";
import { addsuffle } from "./addSuffle.js";
import { addCircle, addCircles } from "./addCircles.js";

export const app = new Application();
const rects = [];
const circle = [];
const circles = [];
const suffles = [];
const button = [];
async function setup() {
  await app.init({ background: "#000", resizeTo: window });
  document.body.appendChild(app.canvas);
}

async function preload() {
  const assets = [
    {
      alias: "background",
      src: "./wonderOfWords/assets/bg.png",
    },
    {
      alias: "rect",
      src: "./wonderOfWords/assets/rect.png",
    },
    {
      alias: "circle",
      src: "./wonderOfWords/assets/circle.png",
    },
    {
      alias: "suffle",
      src: "./wonderOfWords/assets/suffle.png",
    },
    {
      alias: "button",
      src: "./wonderOfWords/assets/orange-pane.png",
    },
  ];
  await Assets.load(assets);
}

(async () => {
  await setup();
  await preload();
  addBackground(app);
  addRect(app, rects);
  addCircle(app, circle);
  addCircles(app, circles);
  addsuffle(app, suffles);
  addButton(app, button);
})();
