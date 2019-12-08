import Canvas from '../Canvas/canvas.js';
import SongPlayer from '../Song player/songPlayer.js';
import DropDown from '../dropdown/dropdown.js';
import Resizer from '../Canvas/resizer.js';

export default class App {
  constructor() {
    this._elements = {
      playerContainer: document.querySelector('.player_container')
    }
  }

  build() {
    this._buildCanvas();
    this._buildSongPlayer();
    this._buildDropDown();
    this._buildResizer();
  }

  _buildResizer() {
    const onSelect = (rowCount, columnCount) => {
      this._gridValues.rows = rowCount;
      this._gridValues.columns = columnCount;

      this._canvas.drawRectangle('#000');
    }

    this._gridValues = {
      rows: 9,
      columns: 16
    };

    const resizer = new Resizer(document.body, this._gridValues.rows, this._gridValues.columns, onSelect);

    resizer.build();
  }

  _buildCanvas() {
    const width = 970, height = 550;
    this._canvas = new Canvas(this._elements.playerContainer, { width, height });
    this._canvas.drawRectangle('#000');
    this._canvas.width = 970;
    this._canvas.height = 550;
  }

  _setRGBColors(analyserValue) {
    const randomValue = () => Math.floor(Math.random() * analyserValue);
    const randomValueFromThemeRange = () => Math.abs(randomValue() - 128);

    const colors = this._themeColorsArray;
    const setThemeColor = () => colors.map(color => +color || randomValueFromThemeRange());

    const randomColor = () => {
      let colors = new Array(3).fill(null);
      
      colors = colors.map(() => randomValue());

      return colors;
    }

    return colors ? setThemeColor() : randomColor();
  }

  _buildSongPlayer() {
    this._songPlayer = new SongPlayer(this._elements.playerContainer);
    this._songPlayer.playAction = this._playerAction.bind(this);   
  }

  _calculateGridValues({ rows, columns }) {
    const gap = 10;

    const cellWidth = (this._canvas.width - (columns + 1) * gap) / columns;
    const cellHeight = (this._canvas.height - (rows + 1) * gap) / rows;

    return { cellWidth, cellHeight, gap, rows, columns };
  }

  _playerAction(data) {
    const { cellWidth, cellHeight, gap, rows, columns } = this._calculateGridValues(this._gridValues);
    let startX = 0;
    let startY = 0;

    for (let i = 0; i < rows * columns; i++) {
      const rgbColors = this._setRGBColors(data[i]);
      const color = `rgb(${[...rgbColors]})`;

      if ((i % columns === 0) && (i !== 0)) {
        startY += cellHeight + gap;
        startX = 0;
      }
      
      this._canvas.drawRectangle(color, startX + gap, startY + gap, cellWidth, cellHeight);
      startX += cellWidth + gap;
    }
  }

  _buildDropDown() {
    const dropdDownOptions = ['RED', 'GREEN', 'BLUE'];
    const onSelect = (selectedColor) => this._themeColorsArray = selectedColor.match(/\d+/g);

    new DropDown({selector: '.dropdown', label: 'Select theme', options: dropdDownOptions, onSelect});
  }
}
