import {
  Sprite,
  Container,
  Text,
  TextStyle,
  Graphics,
} from "../node_modules/pixi.js/dist/pixi.mjs";
import { app } from "./script.js";
import { addButton } from "./addButton.js";
import { rects } from "./addRect.js";
import { suffles } from "./addSuffle.js";
import { currentWordText, circles } from "./addCircles.js";

export const state = {
  currentWord: "",
};
export const getCurrentWord = () => currentWord;
export const setCurrentWord = (newWord) => {
  currentWord = newWord;
};
export const validWords = ["GOLD", "LOG", "DOG", "GOD"];

export function createCircle(asset, x, y, scale, alpha, container) {
  const circle = Sprite.from(asset);
  circle.position.set(x, y);
  circle.scale.set(scale);
  circle.alpha = alpha;
  circle.interactive = true;
  circle.buttonMode = true;
  container.addChild(circle);
  return circle;
}

export function updateCurrentWord(text) {
  if (state.currentWord.length >= 4) {
    if (!validWords.includes(state.currentWord)) {
      shakeText(currentWordText);
      setTimeout(() => {
        state.currentWord = "";
        displayCurrentWord();
      }, 300);
    }
    return;
  }
  state.currentWord += text;
  displayCurrentWord();
}

export function displayCurrentWord() {
  if (currentWordText) {
    currentWordText.text = state.currentWord;
  }
}

export function shakeText(textSprite) {
  const originalX = textSprite.x;
  const shakeDistance = 10;
  const shakeDuration = 150;
  let startTime = Date.now();

  const shake = () => {
    const elapsed = Date.now() - startTime;
    if (elapsed < shakeDuration) {
      const offset = Math.sin(elapsed * 10) * shakeDistance;
      textSprite.x = originalX + offset;
      requestAnimationFrame(shake);
    } else {
      textSprite.x = originalX;
    }
  };

  shake();
}

const rectTextMap = new Map();

export function placeWordInRects(word) {
  const positions = {
    GOLD: [0, 1, 2, 3],
    GOD: [0, 5, 6],
    DOG: [6, 4, 7],
    LOG: [2, 8, 7],
  };

  const indices = positions[word];
  if (!indices) {
    return;
  }
  indices.forEach((index, i) => {
    if (index < rects.length) {
      const rect = rects[index];
      const style = new TextStyle({
        fontFamily: "Arial",
        fontSize: 64,
        fill: "white",
        align: "center",
      });
      const textSprite = new Text(word[i], style);
      textSprite.anchor.set(0.5);
      textSprite.position.set(
        rect.x + rect.width / 2,
        rect.y + rect.height / 2
      );
      rect.parent.addChild(textSprite);
      rect.tint = 0xffa500;
      rectTextMap.set(rect, textSprite);
    }
  });
  checkAllRectsFilled();
}

function disableInteractivity() {
  circles.forEach((obj) => {
    if (obj.circle) {
      obj.circle.interactive = false;
    }
    if (obj.text) {
      obj.text.interactive = false;
    }
  });
  suffles.forEach((suffle) => {
    if (suffle) {
      suffle.interactive = false;
    }
  });
}

function checkAllRectsFilled() {
  const allRectsFilled = rects.every((rect) => rectTextMap.has(rect));
  if (allRectsFilled) {
    disableInteractivity();
    const overlay = new Graphics();
    overlay.fill(0x000000, 0.7);
    overlay.rect(0, 0, app.screen.width, app.screen.height);
    overlay.fill();
    app.stage.addChild(overlay);

    const wordsText = new Text("Words Of", {
      fontFamily: "Arial",
      fontSize: 96,
      fill: "white",
      align: "center",
    });
    wordsText.anchor.set(0.5);
    wordsText.position.set(600, 400);
    app.stage.addChild(wordsText);

    const wonderText = new Text("wonder", {
      fontFamily: "Arial",
      fontSize: 96,
      fill: "white",
      align: "center",
    });
    wonderText.anchor.set(0.5);
    wonderText.position.set(600, 500);
    app.stage.addChild(wonderText);

    const underline = new Graphics();
    underline.fill(0xffffff);
    underline.rect(
      wonderText.x - wonderText.width / 2,
      wonderText.y + wonderText.height * 0.5,
      wonderText.width,
      5
    );
    underline.fill();
    app.stage.addChild(underline);
    const refleshButton = addButton(app, {
      x: 600,
      y: 1170,
      scale: 1.2,
      text: "Play Agin",
      fontSize: 48,
      minScale: 0.85,
      maxScale: 0.95,
      scaleSpeed: 0.0015,
      tint: 0x000000,
      alpha: 1,
      fontFamily: "Verdana",
      fontColor: "#FFFFFF",
      scaleVariation: 0.2,
    });
    refleshButton.button.interactive = true;
    refleshButton.button.buttonMode = true;
    refleshButton.button.on("pointerdown", () => {
      location.reload();
    });
  }
}
