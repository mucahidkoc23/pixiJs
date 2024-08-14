import { Sprite } from "../node_modules/pixi.js/dist/pixi.mjs";

let backgroundSprite;

export function addBackground(app) {
  backgroundSprite = Sprite.from("background");
  backgroundSprite.x = 150;
  backgroundSprite.y = 2;
  app.stage.addChild(backgroundSprite);
}
