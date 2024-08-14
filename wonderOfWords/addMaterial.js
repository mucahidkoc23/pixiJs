import {
  Sprite,
  Container,
  Text,
  TextStyle,
  Graphics,
  Ticker,

} from "../node_modules/pixi.js/dist/pixi.mjs";
import { app } from "./script.js";

const circles = [];
const suffles = [];
let currentWord = "";
let selectedCircle = null;
let currentWordText;
let addCircleObject = null;
let rects = [];

const validWords = ["GOLD", "LOG", "DOG", "GOD"];

function createCircle(asset, x, y, scale, alpha, container) {
  const circle = Sprite.from(asset);
  circle.position.set(x, y);
  circle.scale.set(scale);
  circle.alpha = alpha;
  circle.interactive = true;
  circle.buttonMode = true;
  container.addChild(circle);
  return circle;
}

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

function updateCurrentWord(text) {
  if (currentWord.length >= 4) {
    if (!validWords.includes(currentWord)) {
      shakeText(currentWordText);
      setTimeout(() => {
        currentWord = "";
        displayCurrentWord();
      }, 300);
    }
    return;
  }
  currentWord += text;
  displayCurrentWord();
}

function displayCurrentWord() {
  if (currentWordText) {
    currentWordText.text = currentWord;
  }
}

function shakeText(textSprite) {
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

function handleWordClick() {
  if (validWords.includes(currentWord)) {
    if (currentWord === "GOLD") {
      placeWordInRects("GOLD", true);
    }
    if (currentWord === "GOD") {
      placeWordInRects("GOD");
    }
    if (currentWord === "DOG") {
      placeWordInRects("DOG");
    }
    if (currentWord === "LOG") {
      placeWordInRects("LOG");
    }
    currentWord = "";
    displayCurrentWord();
  } else {
    shakeText(currentWordText);
    setTimeout(() => {
      currentWord = "";
      displayCurrentWord();
    }, 300);
  }
}

const rectTextMap = new Map();

function placeWordInRects(word) {
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
  currentWordText = new Text(currentWord, style);
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

export function addButton(app, options = {}) {
  const {
    x = 590,
    y = 1180,
    scale = 0.8,
    text = "Play Now",
    fontSize = 54,
    scaleVariation = 0.1,
    scaleSpeed = 0.001,
    tint = 0x000000,
    alpha = 0.7,
    fontFamily = "Arial",
    fontColor = "white",
  } = options;

  const buttonContainer = new Container();
  app.stage.addChild(buttonContainer);

  const buttonAsset = "button";
  const button = Sprite.from(buttonAsset);
  button.anchor.set(0.5);
  button.x = x;
  button.y = y;
  button.scale.set(scale);
  button.tint = tint;
  button.alpha = alpha;
  buttonContainer.addChild(button);

  const textStyle = new TextStyle({
    fontFamily: fontFamily,
    fontSize: fontSize,
    fill: fontColor,
    align: "center",
  });

  const buttonText = new Text(text, textStyle);
  buttonText.anchor.set(0.5);
  buttonText.x = button.x;
  buttonText.y = button.y;
  buttonContainer.addChild(buttonText);

  let scaleDirection = 1;
  const minScale = scale - scaleVariation / 2;
  const maxScale = scale + scaleVariation / 2;
  let currentScale = scale;

  const ticker = new Ticker();
  ticker.add(() => {
    if (currentScale >= maxScale) {
      scaleDirection = -1;
    } else if (currentScale <= minScale) {
      scaleDirection = 1;
    }
    currentScale += scaleSpeed * scaleDirection;
    button.scale.set(currentScale);
    buttonText.scale.set(currentScale / scale);
  });
  ticker.start();

  return {
    button,
    buttonText,
    container: buttonContainer,
    ticker,
  };
}
