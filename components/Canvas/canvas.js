export default class Canvas {
  constructor(parent, {width = 300, height = 300}) {
    this._parent = parent;
    this._width = width;
    this._height = height;

    this._initCanvas();
  }

  _initCanvas() {
    this._canvas = document.createElement('canvas');
    this._canvas.width = this._width;
    this._canvas.height = this._height;
    this._parent.appendChild(this._canvas);

    this._context = this._canvas.getContext("2d");
  }

  drawRectangle(color, startX = 0, startY = 0, widthSize = this._width, heightSize = this._height) {
    this._context.fillStyle = color;
    this._context.fillRect(startX, startY, widthSize, heightSize);
  }
}