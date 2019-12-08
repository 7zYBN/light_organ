import Canvas from '../Canvas/canvas.js';
import SongPlayer from '../Song player/songPlayer.js';
import DropDown from '../dropdown/dropdown.js';

export default class App {
  constructor() {

  }

  build() {
    this._buildCanvas();
    this._buildSongPlayer();
    this._buildDropDown();
  }

  _buildCanvas() {
    const width = 970, height = 550;
    this._canvas = new Canvas(document.body, { width, height }, 16, 9);
    this._canvas.drawRectangle('#000');
  }

  _setRGBColors(analyserValue) {
    const randomValueFromThemeRange = () => {
      return Math.abs(randomValue() - 128);
    }

    const randomValue = () => {
      return Math.floor(Math.random() * analyserValue);
    }

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
    this._songPlayer = new SongPlayer(document.body);
    this._songPlayer.playAction = this._playerAction.bind(this);   
  }

  _playerAction(data) {
    const squareSize = 50;
    const gap = 10;
    let startX = 0;
    let startY = 0;

    for (let i = 0; i < 144; i++) {

      const rgbColors = this._setRGBColors(data[i]);
      
      if ((i % 16 === 0) && (i !== 0)) {
        startY += squareSize + gap;
        startX = 0;
      }
      
      const color = `rgb(${[...rgbColors]})`;
      console.log(color)
      this._canvas.drawRectangle(color, startX + gap, startY + gap, squareSize, squareSize);
      startX += squareSize + gap;
    }
  }

  _buildDropDown() {
    const dropdDownOptions = ['RED', 'GREEN', 'BLUE'];
    const onSelect = (selectedColor) => this._themeColorsArray = selectedColor.match(/\d+/g);

    new DropDown({selector: '.dropdown', label: 'Select theme', options: dropdDownOptions, onSelect});
  }
}
