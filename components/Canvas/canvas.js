export default class Canvas {
  constructor(parent, {width = 300, height = 300}) {
    this._parent = parent;
    this._width = width;
    this._height = height;

    this._initCanvas();
  }

  _initCanvas() {
    this._canvas = document.createElement('canvas');

    const { _canvas: canvas, _width: width, _height: height, _parent: parent } = this;

    canvas.width = width;
    canvas.height = height;
    parent.appendChild(canvas);

    this._context = canvas.getContext("2d");
  }

  drawRectangle(color, startX = 0, startY = 0, widthSize = this._width, heightSize = this._height) {
    const { _context: context } = this;

    context.fillStyle = color;
    context.fillRect(startX, startY, widthSize, heightSize);
  }
}
