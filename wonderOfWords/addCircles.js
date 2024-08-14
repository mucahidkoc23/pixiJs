import {
  Container,
  Text,
  TextStyle,
} from "../node_modules/pixi.js/dist/pixi.mjs";
import {
  createCircle,
  updateCurrentWord,
  state,
  validWords,
  placeWordInRects,
  shakeText,
  displayCurrentWord,
} from "./addMaterial.js";

export const circles = [];
export let selectedCircle = null;
export let addCircleObject = null;
export let currentWordText;

function createText(text, circle, container) {
  const style = new TextStyle({
    fontFamily: "Arial",
    fontSize: 46,
    fill: "#FFA500",
    align: "center",
  });
  const textSprite = new Text(text, style);
  textSprite.anchor.set(0.5);
  textSprite.position.set(
    circle.x + circle.width / 2,
    circle.y + circle.height / 2
  );

  container.addChild(textSprite);
  return textSprite;
}

function handleWordClick() {
  if (validWords.includes(state.currentWord)) {
    if (state.currentWord === "GOLD") {
      placeWordInRects("GOLD", true);
    }
    if (state.currentWord === "GOD") {
      placeWordInRects("GOD");
    }
    if (state.currentWord === "DOG") {
      placeWordInRects("DOG");
    }
    if (state.currentWord === "LOG") {
      placeWordInRects("LOG");
    }
    state.currentWord = "";
    displayCurrentWord();
  } else {
    shakeText(currentWordText);
    setTimeout(() => {
      state.currentWord = "";
      displayCurrentWord();
    }, 300);
  }
}

export function addCircle(app) {
  const circlesContainer = new Container();
  app.stage.addChild(circlesContainer);
  addCircleObject = createCircle(
    "circle",
    450,
    800,
    0.05,
    0.7,
    circlesContainer
  );
  circles.push({ circle: addCircleObject, text: null });
  const style = new TextStyle({
    fontFamily: "Arial",
    fontSize: 54,
    fill: "white",
    align: "center",
  });
  currentWordText = new Text(state.currentWord, style);
  currentWordText.anchor.set(0.5);
  currentWordText.position.set(
    addCircleObject.x + addCircleObject.width / 2,
    addCircleObject.y - 30
  );
  currentWordText.interactive = true;
  currentWordText.buttonMode = true;
  currentWordText.on("pointerdown", handleWordClick);
  app.stage.addChild(currentWordText);
}

export function addCircles(app) {
  const circlesContainer = new Container();
  app.stage.addChild(circlesContainer);

  const positions = [
    { x: 460, y: 900, alpha: 0.5, text: "G" },
    { x: 650, y: 900, alpha: 0.5, text: "L" },
    { x: 555, y: 815, alpha: 0.5, text: "O" },
    { x: 555, y: 995, alpha: 0.5, text: "D" },
  ];

  positions.forEach((pos) => {
    const circle = createCircle(
      "circle",
      pos.x,
      pos.y,
      0.015,
      pos.alpha,
      circlesContainer
    );
    const text = createText(pos.text, circle, circlesContainer);
    text.interactive = true;
    text.buttonMode = true;

    text.on("pointerdown", () => {
      updateCurrentWord(pos.text);
      if (selectedCircle) {
        selectedCircle.circle.tint = 0xffffff;
        selectedCircle.text.style.fill = "#FFA500";
      }
      circle.tint = "#F9840F";
      text.style.fill = "white";
      selectedCircle = { circle, text };
    });

    text.on("pointerup", () => {
      if (selectedCircle) {
        selectedCircle.circle.tint = 0xffffff;
        selectedCircle.text.style.fill = "#FFA500";
      }
      circle.tint = 0xffffff;
      text.style.fill = "#FFA500";
    });

    circles.push({ circle, text });
  });
}
