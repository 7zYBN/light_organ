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
    this._elements.button.addEventListener('click', () => {
      this._elements.resizerContainer.classList.add('resizer--container-shown');
    })

    this._elements.resizerContainer.addEventListener('mouseover', event => {
      const squares = [...document.querySelectorAll('.resizer--square')];
      const selectedSquares = squares.filter(square => (+square.dataset.row <= +event.target.dataset.row) && (+square.dataset.column <= +event.target.dataset.column))
      
      selectedSquares.forEach(square => square.classList.add('resizer--square-selected'));
    })

    this._elements.resizerContainer.addEventListener('mouseout', () => {
      const squares = [...document.querySelectorAll('.resizer--square-selected')];
      
      squares.forEach(square => square.classList.remove('resizer--square-selected'));
    })

    this._elements.resizerContainer.addEventListener('click', event => {
      if (event.target.closest('.resizer--square')) {
        const rows = +event.target.dataset.row + 1;
        const columns = +event.target.dataset.column + 1;
        
        this._onSelect(rows, columns);
      }
      this._elements.resizerContainer.classList.remove('resizer--container-shown');
    })
  }
}