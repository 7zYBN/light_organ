export default class Resizer {
  constructor(parent, maxRows, maxColumns, onSelect) {
    this._parent = parent;
    this._maxRows = maxRows;
    this._maxColumns = maxColumns;
    this._onSelect = onSelect;

    this._elements = {};
  }

  build() {
    this._buildElements();
    this._setEventListeners();
  }

  _buildElements() {
    this._buildResizer();
    this._buildButton();
    this._buildSelector();
  }

  _buildResizer() {
    const resizer = document.createElement('div');

    resizer.classList.add('resizer');
    this._parent.appendChild(resizer);

    this._elements.resizer = resizer;
  }

  _buildButton() {
    const button = document.createElement('button');

    button.innerHTML = 'Resize';
    button.classList.add('resizer--button')
    this._elements.resizer.appendChild(button);

    this._elements.button = button;
  }

  _buildSelector() {
    const container = document.createElement('div');

    container.classList.add('resizer--container');
    container.style.gridTemplateColumns = `repeat(${this._maxColumns}, 1fr)`;
    container.style.gridTemplateRows= `repeat(${this._maxRows}, 1fr)`;
    this._elements.resizer.appendChild(container);

    this._elements.resizerContainer = container;
    
    this._buildSelectorContent();
  }

  _buildSelectorContent() {
    const contentLength = this._maxRows * this._maxColumns;

    for (let i = 0; i < contentLength; i++) {
      this._buildSingleCell(i);
    }
  }

  _buildSingleCell(index) {
    const square = document.createElement('div');

    square.dataset.row = Math.floor(index / this._maxColumns);
    square.dataset.column = index % this._maxColumns;
    square.classList.add('resizer--square');
    this._elements.resizerContainer.appendChild(square);
  }

  _setEventListeners() {
    this._setresizerContainerListeners();
    document.body.addEventListener('click', event => this._clickSquares(event));
  }

  _setresizerContainerListeners() {
    const { resizerContainer: container } = this._elements;

    container.addEventListener('mouseover', event => this._selectSquares(event));
    container.addEventListener('mouseout', () => this._unselectSquares());
  }

  _selectSquares(event) {
    const { row, column } = event.target.dataset;
    const squares = [...document.querySelectorAll('.resizer--square')];
    const selectedSquares = squares.filter(square => (+square.dataset.row <= +row) && (+square.dataset.column <= +column))
    
    selectedSquares.forEach(square => square.classList.add('resizer--square-selected'));
  }

  _unselectSquares() {
    const squares = [...document.querySelectorAll('.resizer--square-selected')];
      
    squares.forEach(square => square.classList.remove('resizer--square-selected'));
  }

  _clickSquares(event) {
    const { row, column } = event.target.dataset;

    if (event.target.closest('.resizer')) {
      if (event.target.closest('.resizer--square')) {
        const rows = +row + 1;
        const columns = +column + 1;
  
        this._onSelect(rows, columns);
      }

      this._elements.resizerContainer.classList.toggle('resizer--container-shown');
    } else {
      this._elements.resizerContainer.classList.remove('resizer--container-shown');
    }

    
  }
}
