import { Container } from "../node_modules/pixi.js/dist/pixi.mjs";
import { createCircle } from "./addMaterial.js";
import { circles, currentWordText, addCircleObject } from "./addCircles.js";
export const suffles = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function addsuffle(app) {
  const sufleContainer = new Container();
  app.stage.addChild(sufleContainer);

  const suffle = createCircle("suffle", 560, 910, 0.15, 1, sufleContainer);
  suffle.interactive = true;
  suffle.buttonMode = true;

  suffle.on("pointerdown", () => {
    suffle.scale.set(0.16);
    setTimeout(() => suffle.scale.set(0.15), 100);

    if (circles.length > 1) {
      const circlesToShuffle = circles.filter((obj) => obj.text !== null);
      const positions = circlesToShuffle.map((obj) => ({
        x: obj.circle.x,
        y: obj.circle.y,
      }));
      shuffleArray(positions);
      circlesToShuffle.forEach((obj, i) => {
        obj.circle.position.set(positions[i].x, positions[i].y);
        obj.text.position.set(
          positions[i].x + obj.circle.width / 2,
          positions[i].y + obj.circle.height / 2
        );
      });
      if (currentWordText && addCircleObject) {
        currentWordText.position.set(
          addCircleObject.x + addCircleObject.width / 2,
          addCircleObject.y - 30
        );
      }
    }
  });

  suffles.push(suffle);
}
