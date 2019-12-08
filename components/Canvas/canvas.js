export default class Canvas {
  constructor(parent, {width = 300, height = 300}, rows = 5, columns = 5) {
    this._parent = parent;
    this._width = width;
    this._height = height;
    // this._rows = rows;
    // this._columns = columns;

    this._initCanvas();
  }

  _initCanvas() {
    this._canvas = document.createElement('canvas');
    this._canvas.width = this._width;
    this._canvas.height = this._height;
    this._parent.appendChild(this._canvas);

    this._context = this._canvas.getContext("2d");
  }

  // _calculateGridValues() {
  //   const gap = 10;
  //   this._cellSize.width = (this._width - (this._columns + 1) * gap) / this._columns;
  //   this._cellSize.height = (this._height - (this._rows + 1) * gap) / this._rows;
  // }

  drawRectangle(color, startX = 0, startY = 0, widthSize = this._width, heightSize = this._height) {
    this._context.fillStyle = color;
    this._context.fillRect(startX, startY, widthSize, heightSize);
  }
}
