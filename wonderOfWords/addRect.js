import { Sprite, Container } from "../node_modules/pixi.js/dist/pixi.mjs";
export let rects = [];
export function addRect(app, rectsList) {
  const rectContainer = new Container();
  app.stage.addChild(rectContainer);
  const rectAssets = [
    "rect",
    "rect",
    "rect",
    "rect",
    "rect",
    "rect",
    "rect",
    "rect",
    "rect",
  ];
  const positions = [
    { x: 380, y: 200 },
    { x: 530, y: 200 },
    { x: 680, y: 200 },
    { x: 830, y: 200 },
    { x: 530, y: 500 },
    { x: 380, y: 350 },
    { x: 380, y: 500 },
    { x: 680, y: 500 },
    { x: 680, y: 350 },
  ];

  rectAssets.forEach((asset, index) => {
    const rect = Sprite.from(asset);
    rect.x = positions[index].x;
    rect.y = positions[index].y;
    rect.scale.set(0.5);
    rect.tint = "#FAF7E5";
    rectContainer.addChild(rect);
    rectsList.push(rect);
  });
  rects = rectsList;
}
