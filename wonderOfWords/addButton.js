import {
  Sprite,
  Container,
  Text,
  TextStyle,
  Ticker,

} from "../node_modules/pixi.js/dist/pixi.mjs";

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